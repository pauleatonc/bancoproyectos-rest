from rest_framework import serializers

class UnifiedHistorySerializer(serializers.Serializer):
    history_date = serializers.DateTimeField(format="%d/%m/%Y")  # Cambia el formato de la fecha
    action = serializers.SerializerMethodField()  # Usaremos un método para personalizar la salida
    title = serializers.CharField()

    def get_action(self, obj):
        # Traduce 'history_type' al español y lo combina con 'model_type'
        translations = {
            "Deleted": "eliminado",
            "Changed": "editado",
            "Fecha de creación": "creado"
        }
        return f"{obj['model_type']} {translations.get(obj['history_type'], obj['history_type'])}"


class ProjectStatusSerializer(serializers.Serializer):
    project_name = serializers.CharField()
    history_date = serializers.DateTimeField(format="%d/%m/%Y")
    action = serializers.CharField()
    read = serializers.BooleanField()
    notification_id = serializers.CharField()
