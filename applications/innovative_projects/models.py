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


class InnovativeProjects(BaseModel):
    """
    Modelo para proyectos innovadores
    """
    title = models.CharField(max_length=23, verbose_name='Título (obligatorio)', unique=True)
    description = models.TextField(validators=[MinLengthValidator(280, 'La descripción debe tener al menos 280 caracteres.')])
    portada = ProcessedImageField(upload_to='projects', processors=[
        ResizeToFill(1200, 630)], format='WEBP', options={'quality': 60}, null=True,
                                  blank=False, verbose_name='Foto portada (obligatorio)')
    program = models.ManyToManyField(Program, blank=False, verbose_name='Programa (obligatorio)')
    public = models.BooleanField(default=True)


    class Meta:
        verbose_name = 'Proyecto Innovador'
        verbose_name_plural = 'Proyectos Innovadores'

    def __str__(self):
        return self.title


class InnovativeWebSource(models.Model):
    url = models.URLField()
    project = models.ForeignKey('InnovativeProjects', related_name='web_sources', on_delete=models.CASCADE)


class InnovativeGalleryImage(models.Model):
    image = ProcessedImageField(
        upload_to='innovative_gallery_images',
        processors=[ResizeToFill(1200, 630)],
        format='WEBP',
        options={'quality': 60},
        null=True,
        blank=True
    )
    project = models.ForeignKey('InnovativeProjects', related_name='innovative_gallery_images', on_delete=models.CASCADE)