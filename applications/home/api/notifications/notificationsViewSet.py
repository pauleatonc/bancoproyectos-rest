from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from applications.innovative_projects.models import InnovativeProjects
from applications.innovative_projects.api.v1.innovativeProjectSerializer import InnovativeProjectsAdminListSerializer
from applications.innovative_projects.api.v1.innovativeProjectsViewSet import HasProjectPermissions
from applications.innovative_projects.models import HistoricalInnovativeProjects, HistoricalInnovativeWebSource, HistoricalInnovativeGalleryImage
from applications.users.permissions import is_admin, is_editor_general_or_superuser, is_program_related_user, is_any_editor_or_superuser
from collections import Counter


class NotificationViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['GET'], permission_classes=[HasProjectPermissions])
    def innovative_projects_notifications(self, request):
        user = request.user

        if is_editor_general_or_superuser(user):
            innovative_projects = InnovativeProjects.objects.all().order_by('-created_date')

        # Editor Programa y Profesional: pueden ver innovative projects que compartan el mismo program
        elif "Editor Programa" in user.groups.values_list('name', flat=True) or \
                "Profesional" in user.groups.values_list('name', flat=True):
            # Asegurarse de que el usuario tiene un programa asociado
            try:
                user_program = user.program
                innovative_projects = InnovativeProjects.objects.filter(program=user_program).order_by('-created_date')
            except AttributeError:  # En caso de que el usuario no tenga un programa asociado
                innovative_projects = InnovativeProjects.objects.none()

        # Profesional Temporal: pueden ver innovative projects que compartan el mismo program y que haya sido creado por él
        elif "Profesional Temporal" in user.groups.values_list('name', flat=True):
            try:
                user_program = user.program
                innovative_projects = InnovativeProjects.objects.filter(program=user_program).order_by('-created_date')
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


        # Filtrar estados según el grupo del usuario
        if is_any_editor_or_superuser(request.user):
            allowed_statuses = ["Incompleto", "Pendiente"]
        else:
            allowed_statuses = ["Incompleto", "Pendiente", "Rechazado"]

        # Filtrar proyectos y contarlos
        filtered_projects = [project for project in innovative_projects if
                             project.application_status in allowed_statuses]
        status_list = [project.application_status for project in filtered_projects]
        counters = Counter(status_list)
        total_count = sum(counters.values())

        # Obtener los últimos 4 proyectos filtrados ordenados por fecha de modificación más reciente
        latest_projects = sorted(filtered_projects, key=lambda x: x.modified_date, reverse=True)[:4]

        # Serializar los últimos 4 proyectos
        serialized_latest_projects = InnovativeProjectsAdminListSerializer(latest_projects, many=True).data

        # Respuesta
        serialized_data = {
            'total_count': total_count,
            'latest_projects': serialized_latest_projects,
        }

        return Response(serialized_data, status=status.HTTP_200_OK)