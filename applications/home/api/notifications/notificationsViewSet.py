from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from applications.innovative_projects.models import InnovativeProjects
from applications.innovative_projects.api.v1.innovativeProjectSerializer import InnovativeProjectsAdminListSerializer
from applications.innovative_projects.api.v1.innovativeProjectsViewSet import HasProjectPermissions
from applications.innovative_projects.models import HistoricalInnovativeProjects, HistoricalInnovativeWebSource, HistoricalInnovativeGalleryImage
from applications.users.permissions import is_admin, is_editor_general_or_superuser, is_program_related_user, is_any_editor_or_superuser


class NotificationViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['GET'], permission_classes=[HasProjectPermissions])
    def project_notifications(self, request):
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

        filtered_projects = {'Incompleto': [], 'Pendiente': [], 'Rechazado': []}
        counters = {'Incompleto': 0, 'Pendiente': 0, 'Rechazado': 0}

        for project in innovative_projects:
            project_status = project.application_status  # Calcula la propiedad
            if project_status in filtered_projects:
                counters[project_status] += 1  # Actualiza el contador
                if len(filtered_projects[project_status]) < 2:  # Sólo guarda los dos últimos
                    filtered_projects[project_status].append(project)

        # Serializa los proyectos filtrados
        serialized_data = {}
        for project_status, projects in filtered_projects.items():
            serialized_data[project_status] = {
                'latest_projects': InnovativeProjectsAdminListSerializer(projects, many=True).data,
                'count': counters[project_status]
            }

        # Contador total
        serialized_data['total_count'] = sum(counters.values())

        return Response(serialized_data, status=status.HTTP_200_OK)
