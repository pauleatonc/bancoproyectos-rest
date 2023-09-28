from rest_framework import permissions
from django.contrib.auth.models import User

def is_editor_or_superuser(user: User) -> bool:
    return user.groups.filter(name__in=['Editor', 'Editor PMB', 'Editor PMU']).exists() or user.is_superuser

def is_profesional(user: User) -> bool:
    return user.groups.filter(name__in=['Profesional PMB', 'Profesional PMU', 'Prof. Temporal PMB', 'Prof. Temporal PMU']).exists()

def is_admin(user: User) -> bool:
    return user.groups.filter(name__in={'Editor',
                                        'Editor PMB',
                                        'Editor PMU',
                                        'Profesional PMB',
                                        'Profesional PMU',
                                        'Prof. Temporal PMU',
                                        'Prof. Temporal PMB', }).exists() or user.is_superuser

def is_pmb_user(user: User) -> bool:
    return user.groups.filter(name__in=['Editor PMB', 'Profesional PMB', 'Prof. Temporal PMB']).exists()

def is_pmu_user(user: User) -> bool:
    return user.groups.filter(name__in=['Editor PMU', 'Profesional PMU', 'Prof. Temporal PMU']).exists()

class CanEditUser(permissions.BasePermission):
    """
    Permiso personalizado para verificar quién puede editar a quién.

    Para crear los grupos debes seguir los siguientes pasos en la shell de python:
        python manage.py shell
        from django.contrib.auth.models import Group
        Group.objects.get_or_create(name='Editor')
        Group.objects.get_or_create(name='Editor PMB')
        Group.objects.get_or_create(name='Editor PMU')
        Group.objects.get_or_create(name='Profesional PMB')
        Group.objects.get_or_create(name='Profesional PMU')
        Group.objects.get_or_create(name='Prof. Temporal PMB')
        Group.objects.get_or_create(name='Prof. Temporal PMU')
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

        # Los editores pueden editar a todos, excepto superusuarios y a otros editores
        if "Editor" in user_groups:
            if not obj.is_superuser and "Editor" not in obj_groups:
                return True

        # Editor PMB o Editor PMU
        if "Editor PMB" in user_groups:
            if "Profesional PMB" in obj_groups or "Prof. Temporal PMB" in obj_groups:
                return True

        if "Editor PMU" in user_groups:
            if "Profesional PMU" in obj_groups or "Prof. Temporal PMU" in obj_groups:
                return True

        # Profesional PMB o Profesional PMU
        if "Profesional PMB" in user_groups:
            if "Prof. Temporal PMB" in obj_groups:
                return True

        if "Profesional PMU" in user_groups:
            if "Prof. Temporal PMU" in obj_groups:
                return True

        # Por defecto, no permitir
        return False

