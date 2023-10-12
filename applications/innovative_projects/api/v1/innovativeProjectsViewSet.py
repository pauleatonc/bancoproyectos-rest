from datetime import datetime
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group, Permission
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import BasePermission
from django.utils.text import slugify
from django.db.models import Q
from collections import defaultdict

#
from applications.innovative_projects.models import (
    InnovativeProjects,
    RevisionSectionOne,
    RevisionSectionTwo
)
#
from .innovativeProjectSerializer import (
    InnovativeProjectsSerializerV1,
    InnovativeProjectsCreateSerializer,
    InnovativeProjectsAdminListSerializer,
    InnovativeProjectsUpdateSerializer,
    ProjectEvaluationSerializer,
    InnovativeProjectsHistorySerializer,
    InnovativeGalleryImageHistorySerializer,
    InnovativeWebSourceHistorySerializer
)
from applications.users.permissions import is_admin, is_editor_general_or_superuser, is_program_related_user, is_any_editor_or_superuser
from applications.projects.models import Program
from applications.innovative_projects.models import HistoricalInnovativeProjects, HistoricalInnovativeWebSource, HistoricalInnovativeGalleryImage



class HasProjectPermissions(BasePermission):
    """
    Custom permission to check if a user has the right permissions based on their group.
    """
    def has_permission(self, request, view):
        user = request.user
        if is_admin(user):
            return True
        return False


class InnovativeProjectsViewSet(viewsets.ModelViewSet):
    model = InnovativeProjects
    serializer_class = InnovativeProjectsSerializerV1
    list_serializer_class = InnovativeProjectsSerializerV1
    queryset = None

    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.filter(public=True)
        return self.queryset

    def list(self, request):
        """
        Listado publicado de Proyectos Innovadores

        Solo de lectura
        """
        innovative_projects = self.get_queryset()
        innovative_projects = self.list_serializer_class(innovative_projects, many=True)
        return Response(innovative_projects.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'], permission_classes=[HasProjectPermissions])
    def list_admin(self, request):
        """
        Listado de todos los Proyectos Innovadores para administración.

        Divide el listado entre los distintos roles como administrador
        """
        user = request.user

        if is_editor_general_or_superuser(user):
            innovative_projects = InnovativeProjects.objects.all()

        # Editor Programa y Profesional: pueden ver innovative projects que compartan el mismo program
        elif "Editor Programa" in user.groups.values_list('name', flat=True) or \
                "Profesional" in user.groups.values_list('name', flat=True):
            # Asegurarse de que el usuario tiene un programa asociado
            try:
                user_program = user.program
                innovative_projects = InnovativeProjects.objects.filter(program=user_program)
            except AttributeError:  # En caso de que el usuario no tenga un programa asociado
                innovative_projects = InnovativeProjects.objects.none()

        # Profesional Temporal: pueden ver innovative projects que compartan el mismo program y que haya sido creado por él
        elif "Profesional Temporal" in user.groups.values_list('name', flat=True):
            try:
                user_program = user.program
                innovative_projects = InnovativeProjects.objects.filter(program=user_program)
                safe_innovative_projects = []
                for proj in innovative_projects:
                    try:
                        earliest_record = proj.historical_date.earliest('history_date')
                        if earliest_record.history_user == user:
                            safe_innovative_projects.append(proj)
                    except HistoricalInnovativeProjects.DoesNotExist:
                        # manejar el caso donde no existen registros históricos, si es necesario
                        pass
                innovative_projects = safe_innovative_projects
            except AttributeError:  # En caso de que el usuario no tenga un programa asociado
                innovative_projects = InnovativeProjects.objects.none()

        else:
            # Se devuelve un conjunto vacío si no se cumple ningún criterio anterior
            innovative_projects = InnovativeProjects.objects.none()

        serialized_data = InnovativeProjectsAdminListSerializer(innovative_projects, many=True)
        return Response(serialized_data.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """
        API para la creación de nuevos Proyectos Innovadores

        - Solo superusuarios y usuarios de los grupos Editor, Profesional y Profesional Temporal pueden crear Proyectos
            Innovadores.
        - Los campos program, title, description y portada son obligatorios
        - Los campos web_source e innovative_gallery_images son opcionales
        - El campo 'request_sent' debe ser cambiado a True cuando se envía 'Enviar Solicitud' por parte de los
            Profesionales.
        - El campo evaluated debe ser cambiado a True cuando se envía 'Enviar evaluación' por parte del Editor o
            un superusuario, con el mismo submit el campo 'request_sent' debe ser cambiado a False.

        """
        user = request.user

        if is_editor_general_or_superuser(user):
            # Si es superusuario o editor general, puede crear con cualquier programa.
            serializer = InnovativeProjectsCreateSerializer(data=request.data, context={'request': request})

        elif is_program_related_user(user):
            # Asegurarse de que el usuario tenga un programa asociado
            if not hasattr(user, 'program'):
                return Response({'detail': 'El usuario no tiene un programa asociado.'},
                                status=status.HTTP_403_FORBIDDEN)

            # Asignar automáticamente el programa del usuario al proyecto
            project_data = request.data.copy()
            project_data['program'] = user.program.id
            serializer = InnovativeProjectsCreateSerializer(data=project_data, context={'request': request})

        else:
            return Response({'detail': 'No tienes permiso para crear proyectos.'}, status=status.HTTP_403_FORBIDDEN)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], permission_classes=[HasProjectPermissions])
    def get_last_editors(self, request, pk=None):
        """
        Endpoint para obtener los últimos datos de 'solicitud' y 'aprobación/rechazo'

        Es para vista de 'Ver proyecto'
        """
        try:
            project = InnovativeProjects.objects.get(pk=pk)
        except InnovativeProjects.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Define un diccionario para cada tipo de usuario
        solicitante_info = {
            'full_name': None,
            'group': None,
            'program': None,
            'date': None
        }

        evaluador_info = {
            'full_name': None,
            'group': None,
            'program': None,
            'date': None
        }

        # Obtén el historial del proyecto
        history = HistoricalInnovativeProjects.objects.filter(id=pk).order_by('-history_date')

        # Función auxiliar para obtener el nombre del grupo o identificar si es superusuario
        def get_group_name(user):
            if user.is_superuser:
                return "Superusuario"
            groups = user.groups.all()
            return groups[0].name if groups else None


        # Buscar el último cambio de request_sent de False a True
        for record, previous_record in zip(history, history[1:]):
            if not previous_record.request_sent and record.request_sent:
                solicitante = record.history_user
                solicitante_info['full_name'] = solicitante.get_full_name()
                solicitante_info['group'] = get_group_name(solicitante)
                solicitante_info['program'] = record.history_user.program.sigla
                solicitante_info['date'] = datetime.strftime(record.history_date, "%d/%m/%Y")
                break

        # Buscar el último cambio de evaluated de False a True
        for record, previous_record in zip(history, history[1:]):
            if not previous_record.evaluated and record.evaluated:
                evaluador = record.history_user
                evaluador_info['full_name'] = evaluador.get_full_name()
                evaluador_info['group'] = get_group_name(evaluador)
                evaluador_info['program'] = record.history_user.program.sigla
                evaluador_info['date'] = datetime.strftime(record.history_date, "%d/%m/%Y")
                break

        return Response({
            'solicitante': solicitante_info,
            'evaluador': evaluador_info
        })

    def update(self, request, pk=None, *args, **kwargs):
        """
        Endpoint para crear o actualizar proyectos

        El proyecto se crea en endpoint POST, sin embargo, para llenar los campos distintos a title por primera vez
        se utilizará esta vista.
        """
        user = request.user
        if not is_admin(user):
            return Response({'detail': 'No tienes permiso para actualizar proyectos.'},
                            status=status.HTTP_403_FORBIDDEN)

        instance = self.get_object()
        serializer = InnovativeProjectsUpdateSerializer(instance, data=request.data, partial=True, context={
            'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        """
        Endpoint para visualizar proyecto como administrador

        Solo visible para administradores
        """
        user = request.user
        if not is_admin(user):
            return Response({'detail': 'No tienes permiso para actualizar proyectos.'},
                            status=status.HTTP_403_FORBIDDEN)

        instance = self.get_object()
        serializer = self.get_serializer(instance)

        # Campo public solo editable y visible para editores o superusuarios.
        data = serializer.data
        if not is_any_editor_or_superuser(request.user):
            data.pop('public', None)

        return Response(data)

    def destroy(self, request, *args, **kwargs):
        """
        Endpoint para eliminar proyectos

        - Solo los administradores pueden eliminar proyectos.
        - Los usuarios del grupo 'Profesional Temporal' solo pueden eliminar sus propios proyectos.
        - Se requiere una confirmación ingresando el título del proyecto.
        """
        user = request.user
        project = self.get_object()

        # Verifica si el usuario es administrador
        if is_admin(user):
            pass  # El usuario tiene permiso para eliminar cualquier proyecto
        elif 'Profesional Temporal' in user.groups.values_list('name', flat=True):
            try:
                earliest_record = project.historical_date.earliest('history_date')
                if earliest_record.history_user != user:
                    return Response({'detail': 'No tienes permiso para eliminar este proyecto.'},
                                    status=status.HTTP_403_FORBIDDEN)
            except HistoricalInnovativeProjects.DoesNotExist:
                return Response({'detail': 'No tienes permiso para eliminar este proyecto.'},
                                status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'detail': 'No tienes permiso para eliminar proyectos.'},
                            status=status.HTTP_403_FORBIDDEN)

        # Comprueba si el nombre del proyecto coincide con el título enviado para confirmación
        confirmation_title = request.data.get('confirmation_title', '')

        # Solo se requiere confirmación si el estado de la aplicación es 'Privado' o 'Publicado'
        if project.application_status in ['Privado', 'Publicado']:
            if slugify(confirmation_title) != slugify(project.title):
                return Response({'detail': 'El título no coincide. No se puede eliminar el proyecto.'},
                                status=status.HTTP_400_BAD_REQUEST)

        # Si llegamos a este punto, podemos eliminar el proyecto
        self.perform_destroy(project)
        return Response({'detail': 'Proyecto eliminado con éxito'}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['PATCH'], permission_classes=[HasProjectPermissions])
    def evaluate(self, request, pk=None):
        """
        Endpoint para evaluación de proyecto

        Solo Editores y superusuarios pueden evaluar proyectos
        """
        user = request.user

        # Asegúrate de que el usuario tenga los permisos necesarios
        if not is_any_editor_or_superuser(user):
            return Response({'detail': 'No tienes permiso para evaluar proyectos.'},
                            status=status.HTTP_403_FORBIDDEN)

        # Obtiene el proyecto y sus secciones de revisión
        project = self.get_object()
        section_one = project.revision_section_one
        section_two = project.revision_section_two

        # Deserializa y valida los datos
        serializer = ProjectEvaluationSerializer(data=request.data, instance=project)
        if serializer.is_valid():
            # Actualiza los datos de revisión
            revision_section_one_data = serializer.validated_data.get('revision_section_one', {})
            for field, value in revision_section_one_data.items():
                setattr(section_one, field, value)

            revision_section_two_data = serializer.validated_data.get('revision_section_two', {})
            for field, value in revision_section_two_data.items():
                setattr(section_two, field, value)

            section_one.save()
            section_two.save()
            return Response({'detail': 'Evaluación guardada con éxito'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['GET'])
    def history(self, request, pk=None):
        project = self.get_object(pk)
        project_history = HistoricalInnovativeProjects.objects.filter(id=project.id)
        web_source_history = HistoricalInnovativeWebSource.objects.filter(project__id=project.id)
        gallery_image_history = HistoricalInnovativeGalleryImage.objects.filter(project__id=project.id)

        # Combinar todos los registros históricos y ordenarlos
        combined_history = list(project_history) + list(web_source_history) + list(gallery_image_history)
        combined_history.sort(key=lambda x: (x.history_date, x.history_user_id))

        # Para combinar registros con la misma 'history_date' y 'modified_by'
        grouped_history = defaultdict(list)

        for record in combined_history:
            key = (record.history_date, record.history_user_id)
            grouped_history[key].append(record)

        serialized_history = []

        for (history_date, modified_by), records in grouped_history.items():
            changed_fields = []
            for record in records:
                if isinstance(record, HistoricalInnovativeProjects):
                    serializer = InnovativeProjectsHistorySerializer(record)
                    for change in serializer.data['changed_fields']:
                        change['model'] = 'InnovativeProjects'
                        changed_fields.append(change)

                elif isinstance(record, HistoricalInnovativeWebSource):
                    serializer = InnovativeWebSourceHistorySerializer(record)
                    for change in serializer.data['changed_fields']:
                        change['model'] = 'InnovativeWebSource'
                        changed_fields.append(change)

                elif isinstance(record, HistoricalInnovativeGalleryImage):
                    serializer = InnovativeGalleryImageHistorySerializer(record)
                    for change in serializer.data['changed_fields']:
                        change['model'] = 'InnovativeGalleryImage'
                        changed_fields.append(change)

            serialized_record = {
                'history_date': history_date,
                'modified_by': records[0].history_user.email if records[0].history_user else None,
                'changed_fields': changed_fields
            }
            serialized_history.append(serialized_record)

        return Response(serialized_history)