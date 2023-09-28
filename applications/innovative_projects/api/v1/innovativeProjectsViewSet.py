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
from applications.users.permissions import is_admin, is_pmb_user, is_pmu_user
from applications.projects.models import Program


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
        if user.is_superuser or user.groups.filter(name='Editor').exists():
            innovative_projects = InnovativeProjects.objects.all()
        elif user.groups.filter(name__in=['Editor PMB', 'Profesional PMB']).exists():
            innovative_projects = InnovativeProjects.objects.filter(program__sigla="PMB")
        elif user.groups.filter(name__in=['Editor PMU', 'Profesional PMU']).exists():
            innovative_projects = InnovativeProjects.objects.filter(program__sigla="PMU")
        elif user.groups.filter(name='Prof. Temporal PMB').exists():
            innovative_projects = InnovativeProjects.objects.filter(program__sigla="PMB")
            innovative_projects = [proj for proj in innovative_projects if
                                   proj.historical_date.earliest('history_date').history_user == user]
        elif user.groups.filter(name='Prof. Temporal PMU').exists():
            innovative_projects = InnovativeProjects.objects.filter(program__sigla="PMU")
            innovative_projects = [proj for proj in innovative_projects if
                                   proj.historical_date.earliest('history_date').history_user == user]
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

        print(f"is_pmb_user: {is_pmb_user(user)}")
        print(f"is_pmu_user: {is_pmu_user(user)}")

        # Comprobar si el usuario está en uno de los grupos permitidos o es un superusuario
        if is_admin(user):
            serializer = InnovativeProjectsCreateSerializer(data=request.data, context={'request': request})

            if serializer.is_valid():
                # Asignar automáticamente el programa si el usuario es de un grupo específico
                try:
                    if is_pmb_user(user):
                        program = Program.objects.get(sigla='PMB')
                    elif is_pmu_user(user):
                        program = Program.objects.get(sigla='PMU')
                    else:
                        program = None
                except Program.DoesNotExist:
                    program = None

                serializer.validated_data['program'] = program

                serializer.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'No tienes permiso para crear proyectos.'}, status=status.HTTP_403_FORBIDDEN)