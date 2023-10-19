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
from .serializers import UnifiedHistorySerializer
from ...functions import filter_and_sort_projects

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
