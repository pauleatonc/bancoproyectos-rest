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


class IsSuperUserOrEditor(BasePermission):
    """
    Custom permission to check if a user is superuser or belongs to 'Profesional' or 'Editor' groups.
    """
    def has_permission(self, request, view):
        user = request.user
        if user.is_superuser:
            return True
        if user.groups.filter(name__in=['Profesional', 'Editor']).exists():
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
        Listado de proyectos innovadores

        Solo de lectura
        """
        innovative_projects = self.get_queryset()
        innovative_projects = self.list_serializer_class(innovative_projects, many=True)
        return Response(innovative_projects.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'], permission_classes=[IsSuperUserOrEditor])
    def list_admin(self, request):
        """
        List of all innovative projects, regardless of their 'public' status.
        This list is only available for superusers, or users in 'Profesional' or 'Editor' groups.
        """
        innovative_projects = InnovativeProjects.objects.all()
        serialized_data = InnovativeProjectsAdminListSerializer(innovative_projects, many=True)
        return Response(serialized_data.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        user = request.user

        # Comprobar si el usuario está en uno de los grupos permitidos o es un superusuario
        if user.groups.filter(name__in=['Profesional', 'Editor']).exists() or user.is_superuser:
            serializer = InnovativeProjectsCreateSerializer(data=request.data, context={'request': request})

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'detail': 'No tienes permiso para crear proyectos.'}, status=status.HTTP_403_FORBIDDEN)