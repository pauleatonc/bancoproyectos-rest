from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from applications.innovative_projects.models import InnovativeProjects
from applications.projects.models import Project, Program, Type
from applications.documents.models import Documents
from applications.innovative_projects.api.v1.innovativeProjectSerializer import InnovativeProjectsAdminListSerializer
from applications.innovative_projects.models import HistoricalInnovativeProjects, HistoricalInnovativeWebSource, HistoricalInnovativeGalleryImage
from applications.users.permissions import is_admin, is_editor_general_or_superuser, is_program_related_user, is_any_editor_or_superuser, filter_user_type_projects, has_project_permissions
from collections import Counter
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from .serializers import UnifiedHistorySerializer, ProjectStatusSerializer
from ...functions import filter_and_sort_projects
from ...models import Notification


User = get_user_model()

model_to_title_field = {
    InnovativeProjects: 'title',
    Project: 'name',
    User: 'get_full_name',
    Program: 'name',
    Type: 'name',
    Documents: 'title'
}

tracked_models = [InnovativeProjects, Project, User, Program, Type, Documents]

def get_title_from_model(model, object_id, model_to_title_field):
    field_name = model_to_title_field.get(model, "Desconocido")
    try:
        obj = model.objects.get(id=object_id)
        return getattr(obj, field_name, "Desconocido")
    except model.DoesNotExist:
        return "Desconocido"


class NotificationViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['GET'], permission_classes=[has_project_permissions])
    def innovative_projects_notifications(self, request):
        user = request.user

        innovative_projects = filter_user_type_projects(user, InnovativeProjects, HistoricalInnovativeProjects)

        total_count, latest_projects = filter_and_sort_projects(innovative_projects, user)

        # Serializar los últimos 3 proyectos
        serialized_latest_projects = InnovativeProjectsAdminListSerializer(latest_projects, many=True).data

        # Respuesta
        serialized_data = {
            'total_count': total_count,
            'latest_projects': serialized_latest_projects,
        }

        return Response(serialized_data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'], permission_classes=[has_project_permissions])
    def recent_actions(self, request):
        user = request.user

        # Inicializar lista para almacenar todos los registros históricos
        combined_history = []

        for model in tracked_models:
            content_type = ContentType.objects.get_for_model(model)
            try:
                historical_model = model.historical_date.filter(history_user=user)
            except AttributeError as e:
                print(f"AttributeError para el modelo {model}: {e}")
                continue  # Saltar al siguiente modelo si este no tiene 'historical_date'

            for record in historical_model:
                # Usar record.instance para acceder a los campos del objeto
                original_object_id = record.instance.id
                field_name = model_to_title_field.get(model, "Desconocido")
                original_title = getattr(record.instance, field_name, "Desconocido")

                combined_history.append({
                    'history_date': record.history_date,
                    'history_type': record.get_history_type_display(),
                    'model_type': content_type.name,
                    'object_id': original_object_id,
                    'title': original_title
                })

        # Ordenar la lista combinada por history_date
        combined_history = sorted(combined_history, key=lambda x: x['history_date'], reverse=True)

        # Aquí toma los últimos 10 registros
        combined_history = combined_history[:10]

        # Serializar la lista combinada
        serializer = UnifiedHistorySerializer(combined_history, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def notifications(self, request):
        user = request.user
        result = []

        # Filtrar proyectos basados en el tipo de usuario
        innovative_projects = filter_user_type_projects(user, InnovativeProjects, HistoricalInnovativeProjects)

        # Juntar ambos QuerySets en una lista
        combined = list(innovative_projects)

        # Filtrar y formatear la información
        for project in combined:
            content_type = ContentType.objects.get_for_model(project)

            # Buscar la notificación correspondiente en la base de datos
            notification = Notification.objects.get_or_create(
                user=user,
                content_type=content_type,
                object_id=project.id,
            )[0]

            # Aquí obtienes el campo del título según el modelo
            field_name = model_to_title_field.get(type(project), "Desconocido")
            project_name = getattr(project, field_name, "Desconocido")

            if is_any_editor_or_superuser(user):
                if project.request_sent:
                    result.append({
                        'project_name': project_name,
                        'history_date': project.modified_date,
                        'action': f'Solicitud de {content_type.name} pendiente',
                        'read': notification.read
                    })
            else:
                if project.evaluated:
                    action_text = f"Solicitud de {content_type.name} "
                    action_text += 'rechazada' if project.application_status == 'Rechazado' else 'aceptada'

                    result.append({
                        'project_name': project_name,
                        'history_date': project.modified_date,
                        'action': action_text,
                        'read': notification.read
                    })

        # ordenar desde el más reciente
        sorted_result = sorted(result, key=lambda x: x['history_date'], reverse=True)

        # Serializar el resultado
        serializer = ProjectStatusSerializer(sorted_result, many=True)

        return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def mark_as_read(self, request):
        user = request.user
        notifications = Notification.objects.filter(user=user)
        notifications.update(read=True)
        return Response({"message": "Notificaciones marcadas como leídas"})

    @action(detail=False, methods=['GET'])
    def unread_count(self, request):
        user = request.user
        unread_count = Notification.objects.filter(user=user, read=False).count()
        return Response({"unread_count": unread_count})
