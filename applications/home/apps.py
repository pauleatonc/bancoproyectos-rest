from django.apps import AppConfig

class HomeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'applications.home'

    def ready(self):
        # Importar los modelos y señales aquí, dentro de ready()
        from . import signals
        from django.db.models.signals import post_save
        from applications.innovative_projects.models import InnovativeProjects

        post_save.connect(signals.update_notification_on_save, sender=InnovativeProjects)