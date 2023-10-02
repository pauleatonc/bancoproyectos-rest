from rest_framework import permissions
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

def is_editor_general_or_superuser(user: User) -> bool:
    return user.groups.filter(name='Editor General').exists() or user.is_superuser

def is_any_editor_or_superuser(user: User) -> bool:
    return user.groups.filter(name__in=['Editor General', 'Editor Programa',]).exists()

def is_profesional(user: User) -> bool:
    return user.groups.filter(name__in=['Profesional', 'Profesional Temporal',]).exists()

def is_admin(user: User) -> bool:
    return user.groups.filter(name__in={'Editor General',
                                        'Editor Programa',
                                        'Profesional',
                                        'Profesional Temporal'}).exists() or user.is_superuser

def is_program_related_user(user):
    return "Editor Programa" in user.groups.values_list('name', flat=True) or \
           "Profesional" in user.groups.values_list('name', flat=True) or \
           "Profesional Temporal" in user.groups.values_list('name', flat=True)


class CanEditUser(permissions.BasePermission):
    """
    Permiso personalizado para verificar quién puede editar a quién.

    Para crear los grupos debes seguir los siguientes pasos en la shell de python:
        python manage.py shell
        from django.contrib.auth.models import Group
        Group.objects.get_or_create(name='Editor General')
        Group.objects.get_or_create(name='Editor Programa')
        Group.objects.get_or_create(name='Profesional')
        Group.objects.get_or_create(name='Profesional Temporal')
        quit()
    """

    def has_object_permission(self, request, view, obj):
        user_groups = [group.name for group in request.user.groups.all()]
        obj_groups = [group.name for group in obj.groups.all()]

        # Usuarios pueden editar su propio perfil
        if request.user == obj:
            return True

        # Superusuarios pueden editar a todos, menos a otros superusuarios
        if request.user.is_superuser and not obj.is_superuser:
            return True

        # Los editores generales pueden editar a todos, excepto superusuarios y a otros editores generales
        if "Editor General" in user_groups:
            if not obj.is_superuser and "Editor General" not in obj_groups:
                return True

        # Editor Programa: puede editar si ambos (el editor y el profesional) pertenecen al mismo programa
        if "Editor Programa" in user_groups:
            # Asegurarse de que ambos usuarios tienen un programa asociado
            try:
                user_program = request.user.program
                obj_program = obj.program
            except ObjectDoesNotExist:
                return False

            # Comprobar si ambos programas son iguales y si el objetivo es "Profesional" o "Profesional Temporal"
            if user_program == obj_program and ("Profesional" in obj_groups or "Profesional Temporal" in obj_groups):
                return True

        # Profesional: puede editar si ambos (el profesional y el profesional temporal) pertenecen al mismo programa
        if "Profesional" in user_groups:
            # Asegurarse de que ambos usuarios tienen un programa asociado
            try:
                user_program = request.user.program
                obj_program = obj.program
            except ObjectDoesNotExist:
                return False

            # Comprobar si ambos programas son iguales
            if user_program == obj_program and "Profesional Temporal" in obj_groups:
                return True

        # Por defecto, no permitir
        return False