from rest_framework import permissions


class CanEditUser(permissions.BasePermission):
    """
    Permiso personalizado para verificar quién puede editar a quién.

    Para crear los grupos dedes seguir los siguientes pasos en la shell de python:
        python manage.py shell
        from django.contrib.auth.models import Group
        Group.objects.get_or_create(name='Editor')
        Group.objects.get_or_create(name='Profesional')
    """

    def has_object_permission(self, request, view, obj):
        user_groups = [group.name for group in request.user.groups.all()]

        # Usuarios pueden editar su propio perfil
        if request.user == obj:
            return True

        # Superusuarios pueden editar a todos, menos a otros superusuarios
        if request.user.is_superuser and not obj.is_superuser:
            return True

        # Los editores no pueden editar a superusuarios o a otros editores
        if "Editor" in user_groups:
            if not obj.is_superuser and "Editor" not in [group.name for group in obj.groups.all()]:
                return True

        # Los profesionales no pueden editar a superusuarios, editores o a otros profesionales
        if "Profesional" in user_groups:
            if (not obj.is_superuser and "Editor" not in [group.name for group in obj.groups.all()] and "Profesional"
                    not in [group.name for group in obj.groups.all()]):
                return True

        # Por defecto, no permitir
        return False

