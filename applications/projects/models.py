# standard library
from datetime import timedelta, datetime
#
from django.core.validators import FileExtensionValidator
#
from django.db import models
from django.template.defaultfilters import slugify
# apps de terceros
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill, ResizeToFit
from simple_history.models import HistoricalRecords
#
from applications.base.models import BaseModel
from applications.regioncomuna.models import Comuna
from applications.documents.models import Documents
from .functions import validate_file_size_five, validate_file_size_twenty


class Program(BaseModel):
    name = models.CharField(max_length=200, verbose_name='Nombre', unique=True)
    sigla = models.CharField(max_length=200, verbose_name='Sigla', unique=True)
    icon_program = models.FileField(upload_to='icon-program/', null=True, blank=True, default=None)

    class Meta:
        verbose_name= 'Programa'
        verbose_name_plural= 'Programas'

    def __str__(self):
        return self.sigla


class Type(BaseModel):
    name = models.CharField(
        max_length=200, verbose_name='Tipo de Proyecto', unique=True)
    documents = models.ManyToManyField(Documents, related_name='documents', blank=True)
    icon_type = models.CharField(
        verbose_name='Icono ( Nombre icono)', max_length=200, default='other_admission')
    program = models.ForeignKey(Program, null=True, blank=True,
                                on_delete=models.SET_NULL, verbose_name='Programa (obligatorio)')

    class Meta:
        verbose_name = 'Tipo'
        verbose_name_plural = 'Tipos'

    def __str__(self):
        return self.name


class Year(models.Model):
    number = models.CharField(max_length=4, verbose_name='Año', unique=True)

    def __str__(self):
        return self.number


class PrioritizedTag(BaseModel):
    prioritized_tag = models.CharField(
        max_length=20, verbose_name='Tag para proyectos priorizados', unique=True)

    class Meta:
        verbose_name = 'Tag priorizado'
        verbose_name_plural = 'Tags priorizados'

    def __str__(self):
        return self.prioritized_tag


class Project(BaseModel):
    name = models.CharField(
        max_length=200, verbose_name='Nombre (obligatorio)', unique=True)
    id_subdere = models.CharField(
        max_length=200, verbose_name='ID SUBDERE (obligatorio)', unique=True)
    description = models.TextField(verbose_name='Descripción (obligatorio)')
    year = models.ForeignKey(Year, null=True, blank=False,
                             on_delete=models.SET_NULL, verbose_name='Año (obligatorio)')
    program = models.ForeignKey(Program, null=True, blank=False,
                                on_delete=models.SET_NULL, verbose_name='Programa (obligatorio)')
    type = models.ForeignKey(Type, null=True, blank=False, on_delete=models.SET_NULL,
                             verbose_name='Tipo de Proyecto (obligatorio)')
    public = models.BooleanField(default=True)
    video = models.CharField(max_length=200, null=True,
                             blank=True, verbose_name='Youtube')
    portada = ProcessedImageField(upload_to='projects', processors=[
        ResizeToFill(1200, 630)], format='WEBP', options={'quality': 60}, null=True,
        blank=False, verbose_name='Foto portada (obligatorio)')
    beforeimage = ProcessedImageField(upload_to='projects',
                                      processors=[ResizeToFit(1200, 630)],
                                      format='WEBP',
                                      options={'quality': 60},
                                      null=True, blank=True, verbose_name='Imagen Antes')
    afterimage = ProcessedImageField(upload_to='projects',
                                     processors=[ResizeToFit(1200, 630)],
                                     format='WEBP',
                                     options={'quality': 60},
                                     null=True, blank=True, verbose_name='Imagen Después')
    eett = models.FileField(upload_to='project_documents', validators=[
        FileExtensionValidator(['pdf'], message='Solo se permiten archivos PDF.'), validate_file_size_five],
        null=True, blank=False, verbose_name='EETT')
    presupuesto = models.FileField(
        upload_to='project_documents', validators=[
            FileExtensionValidator(['pdf'], message='Solo se permiten archivos PDF.'), validate_file_size_five], null=True, blank=False, verbose_name='Presupuesto')
    planimetria = models.FileField(
        upload_to='project_documents', validators=[validate_file_size_twenty],
        null=True, blank=False, verbose_name='Planimetría')
    comuna = models.ForeignKey(
        Comuna, on_delete=models.SET_NULL, null=True, blank=False, verbose_name='Comuna')

    slug = models.SlugField(editable=False, max_length=300)

    prioritized_tag = models.ManyToManyField(
        PrioritizedTag, blank=True, verbose_name='Tag proyecto priorizado')

    # checklist = models.ManyToManyField(ChecklistDocuments, verbose_name='Checklist de documentos obligatorios')


    def save(self, *args, **kwargs):
        """Agrega una fecha única para cada slug de proyecto"""
        now = datetime.now()
        total_time = timedelta(
            hours=now.hour,
            minutes=now.minute,
            seconds=now.second
        )
        seconds = int(total_time.total_seconds())
        slug_unique = '%s %s' % (self.name, str(seconds))

        self.slug = slugify(slug_unique)

        super(Project, self).save(*args, **kwargs)

    class Meta:
        """Meta definition for Project"""

        verbose_name= 'Proyecto'
        verbose_name_plural= 'Proyectos'
    
    def __str__(self):
        return self.name


class Projectimage(models.Model):
    image = ProcessedImageField(upload_to='projects',
                                         verbose_name='Galeria de imagenes',
                                         processors=[ResizeToFit(1200, 630)],
                                         format='WEBP',
                                         options={'quality': 60})

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='images'
    )



class Projectfile(models.Model):
    name = models.CharField(null=True, blank=False, max_length=200,
                            verbose_name='Nombre (obligatorio)')
    file = models.FileField(upload_to='project_documents', validators=[
        FileExtensionValidator(['pdf'], message='Solo se permiten archivos PDF.'), validate_file_size_twenty])
    project = models.ForeignKey(
        Project, null=False, blank=False, on_delete=models.CASCADE, related_name='files')