from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model

# apps terceros
from model_utils.models import TimeStampedModel


class Contact(TimeStampedModel):
    """Formulario de contacto"""

    CONTACT_REASON_CHOICES = (
        ('sugerencia', 'Sugerencia'),
        ('consulta', 'Consulta por programa'),
        ('documento', 'Falta un documento'),
        ('falla', 'Falla en la plataforma')
    )

    full_name = models.CharField('Nombre completo (obligatorio)', max_length=60)
    email = models.EmailField('Correo electrónico institucional (obligatorio)')
    organization = models.CharField('Organización a la que perteneces (obligatorio)', max_length=30)
    contact_reason = models.CharField('Razón de contacto (obligatorio)', max_length=30, choices=CONTACT_REASON_CHOICES)
    message = models.TextField('Comentario (obligatorio)', max_length=500)

    class Meta:
        verbose_name = 'Contacto'
        verbose_name_plural = 'Mensajes'

    def __str__(self):
        return self.full_name


class Notification(models.Model):
    user = models.ForeignKey( get_user_model(), related_name='notifications', on_delete=models.CASCADE)
    read = models.BooleanField(default=False)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')