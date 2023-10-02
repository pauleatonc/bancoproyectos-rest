from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group, Permission

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from applications.users.models import User
from applications.users.api.v1.serializers import (
    UserSerializer,
    UserListSerializer,
    UpdateUserSerializer,
    PasswordSerializer,
    GroupSerializer,
    PermissionSerializer,
    UserProfileUpdateSerializer
)
from applications.users.permissions import CanEditUser


class UserViewSet(viewsets.GenericViewSet):
    model = User
    serializer_class = UserSerializer
    list_serializer_class = UserListSerializer
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.filter(is_active=True)
        return self.queryset

    @action(detail=True, methods=['post'])
    def set_password(self, request, pk=None):
        """
        Endpoint para cambio de contraseñas.

        Cualquier usuario solo puede cambiar su propia contraseña.
        """
        user = self.get_object(pk)
        password_serializer = PasswordSerializer(data=request.data)
        if password_serializer.is_valid():
            user.set_password(password_serializer.validated_data['password'])
            user.save()
            return Response({
                'message': 'Contraseña actualizada correctamente'
            })
        return Response({
            'message': 'Hay errores en la información enviada',
            'errors': password_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        """
        Listado de usuarios

        Detalles del usuario solo de lectura
        """
        users = self.get_queryset()
        users_serializer = self.list_serializer_class(users, many=True)
        return Response(users_serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        """
        Endpoint para creación de nuevos usuarios.

        Cualquier usuario nuevo solo es creado como autenticado, debe solicitar el acceso a un grupo superior si lo
        requiere.

        Los campos obligatorios para un usuario nuevo son:
            'rut',
            'tipo_usuario',
        """
        user_serializer = self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({
                'message': 'Usuario registrado correctamente.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Hay errores en el registro',
            'errors': user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """
        Detalle de usuario

        Detalles del usuario solo de lectura
        """
        user = self.get_object(pk)
        user_serializer = self.serializer_class(user)
        return Response(user_serializer.data)

    def update(self, request, pk=None):
        """
        Edición de atributos de administración de usuarios


        Permite editar solo los campos is_active y groups.
        """
        user = self.get_object(pk)

        # Verificar el permiso
        if not CanEditUser().has_object_permission(request, self, user):
            return Response({
                'message': 'No tienes permiso para editar este usuario'
            }, status=status.HTTP_403_FORBIDDEN)

        # Continuar con la lógica de actualización
        user_serializer = UpdateUserSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({
                'message': 'Usuario actualizado correctamente'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'Hay errores en la actualización',
            'errors': user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['patch'], name='Update My Profile')
    def update_profile(self, request, *args, **kwargs):
        """
        Edición de campos del propio usuario autenticado


        Permite editar solo los campos
                'nombres',
                'primer_apellido',
                'segundo_apellido',
                'comuna',
                'email',
                'institucion'
        """
        instance = request.user
        serializer = UserProfileUpdateSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """
        Eliminación de usuario

        Solo vuelve al usuario inactivo, no lo elimina de la base de datos
        """
        user = self.get_object(pk)

        # Verificar el permiso
        if not CanEditUser().has_object_permission(request, self, user):
            return Response({
                'message': 'No tienes permiso para eliminar este usuario'
            }, status=status.HTTP_403_FORBIDDEN)

        # Continuar con la lógica de eliminación
        user_destroy = self.model.objects.filter(id=pk).update(is_active=False)
        if user_destroy == 1:
            return Response({
                'message': 'Usuario eliminado correctamente'
            })
        return Response({
            'message': 'No existe el usuario que desea eliminar'
        }, status=status.HTTP_404_NOT_FOUND)


class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer