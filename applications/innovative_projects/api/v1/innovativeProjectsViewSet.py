from datetime import datetime
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group, Permission
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import BasePermission

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
    InnovativeProjectsAdminListSerializer
)
from applications.users.permissions import is_admin, is_editor_general_or_superuser, is_program_related_user
from applications.projects.models import Program
from applications.innovative_projects.models import HistoricalInnovativeProjects



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

    def get_object(self, pk):
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
                innovative_projects = [proj for proj in innovative_projects if
                                       proj.historical_date.earliest('history_date').history_user == user]
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