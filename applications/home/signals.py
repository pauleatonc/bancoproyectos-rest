from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Notification

def update_notification_on_save(sender, instance, **kwargs):
    from django.contrib.contenttypes.models import ContentType
    content_type = ContentType.objects.get_for_model(instance)

    try:
        notification = Notification.objects.filter(
            content_type=content_type,
            object_id=instance.id
        ).first()

        if notification:  # Verifica si notification no es None
            notification.read = False
            notification.save()

    except Notification.DoesNotExist:
        pass

