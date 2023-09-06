# standard library
from datetime import timedelta, datetime
#
from django.db import models
from django.core.validators import MinLengthValidator
#
from applications.base.models import BaseModel
from applications.projects.models import Program
# apps de terceros
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill, ResizeToFit
from simple_history.models import HistoricalRecords


class GoodPractices(BaseModel):
    """
    Modelo para Buenas Prácticas
    """
    title = models.CharField(max_length=23, verbose_name='Título (obligatorio)', unique=True)
    description = models.TextField(validators=[MinLengthValidator(140, 'La descripción debe tener al menos 140 caracteres.')])
    portada = ProcessedImageField(upload_to='projects', processors=[
        ResizeToFill(1200, 630)], format='WEBP', options={'quality': 60}, null=True,
                                  blank=False, verbose_name='Foto portada (obligatorio)')
    program = models.ManyToManyField(Program, blank=False, verbose_name='Programa (obligatorio)')
    public = models.BooleanField(default=True)
    historical = HistoricalRecords()

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta:
        verbose_name = 'Buena Práctica'
        verbose_name_plural = 'Buenas Prácticas'

    def __str__(self):
        return self.title


class GoodPracticesWebSource(models.Model):
    url = models.URLField()
    project = models.ForeignKey('GoodPractices', related_name='web_sources', on_delete=models.CASCADE)


class GoodPracticesGalleryImage(models.Model):
    image = ProcessedImageField(
        upload_to='good_practices_gallery_images',
        processors=[ResizeToFill(1200, 630)],
        format='WEBP',
        options={'quality': 60},
        null=True,
        blank=True
    )
    project = models.ForeignKey('GoodPractices', related_name='good_practices_gallery_images', on_delete=models.CASCADE)