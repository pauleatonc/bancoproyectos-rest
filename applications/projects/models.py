from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from applications.regioncomuna.models import Region, Comuna
from .managers import ProjectsManager
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError


# límite de tamaño para los archivo
FIVE_SIZE_LIMIT = 5 * 1024 * 1024  # 5 MB
TWENTY_SIZE_LIMIT = 20 * 1024 * 1024  # 20 MB


def validate_file_size_five(value):
    filesize = value.size

    if filesize > FIVE_SIZE_LIMIT:
        raise ValidationError("El archivo PDF no debe exceder los 5MB")
    else:
        return value


def validate_file_size_twenty(value):
    filesize = value.size

    if filesize > TWENTY_SIZE_LIMIT:
        raise ValidationError("El archivo PDF no debe exceder los 20MB")
    else:
        return value


class Program(models.Model):
    name = models.CharField(max_length=200, verbose_name='Nombre', unique=True)
    sigla = models.CharField(max_length=200, verbose_name='Sigla', unique=True)

    def __str__(self):
        return self.sigla


class Guide(models.Model):
    name = models.CharField(max_length=200, verbose_name='Guías', unique=True)
    guide = models.FileField(upload_to='project_documents',
                             validators=[
                                 FileExtensionValidator(
                                     ['pdf'], message='Solo se permiten archivos PDF.'), validate_file_size_five],
                             verbose_name='Documento', null=True, blank=True)

    def __str__(self):
        return self.name


class Type(models.Model):
    name = models.CharField(
        max_length=200, verbose_name='Tipo de Proyecto', unique=True)
    guides = models.ManyToManyField(Guide, related_name='guides')

    def __str__(self):
        return self.name


class Year(models.Model):
    number = models.CharField(max_length=4, verbose_name='Año', unique=True)

    def __str__(self):
        return self.number

class PrioritizedTag(models.Model):
    prioritized_tag = models.CharField(max_length=20, verbose_name='Tag para proyectos priorizados', unique=True)
    def __str__(self):
        return self.prioritized_tag

class ChecklistDocuments(models.Model):
    documentname = models.CharField(verbose_name='Nombre documento', unique=True, max_length=50)
    description = models.TextField(verbose_name='Descripción documento')
    file = models.ManyToManyField(Guide, verbose_name='Guías de referencia', blank=True)

    def __str__(self):
        return self.documentname

class Project(models.Model):
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
    portada = models.ImageField(upload_to='projects', null=True,
                                blank=False, verbose_name='Foto miniatura (obligatorio)')
    portacard = ImageSpecField(source='portada', processors=[
        ResizeToFill(300, 300)], format='png', options={'quality': 60})
    beforeimage = models.ImageField(
        upload_to='projects', null=True, blank=True, verbose_name='Imagen Antes')
    beforeimageresize = ImageSpecField(source='beforeimage', processors=[
        ResizeToFill(800, 600)], format='png', options={'quality': 60})
    afterimage = models.ImageField(
        upload_to='projects', null=True, blank=True, verbose_name='Imagen Después')
    afterimageresize = ImageSpecField(source='afterimage', processors=[
        ResizeToFill(800, 600)], format='png', options={'quality': 60})

    eett = models.FileField(upload_to='project_documents', validators=[
        FileExtensionValidator(['pdf'], message='Solo se permiten archivos PDF.'), validate_file_size_five],
        null=True, blank=False, verbose_name='EETT')
    presupuesto = models.FileField(
        upload_to='project_documents', validators=[
            FileExtensionValidator(['pdf'], message='Solo se permiten archivos PDF.'), validate_file_size_five], null=True, blank=False, verbose_name='Presupuesto')
    comuna = models.ForeignKey(
        Comuna, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='Comuna')

    prioritized_tag = models.ManyToManyField(PrioritizedTag, blank=False, verbose_name = 'Tag proyecto priorizado')

    checklist = models.ManyToManyField(ChecklistDocuments, verbose_name='Checklist de documentos obligatorios')


    def get_comunas_by_region(self):
        if self.region:
            return self.region.comunas

    objects = ProjectsManager()

    def __str__(self):
        return self.name


class Projectimage(models.Model):
    image = models.ImageField(upload_to='projects')
    imagethumbnail = ImageSpecField(source='image',
                                    processors=[ResizeToFill(300, 300)],
                                    format='png',
                                    options={'quality': 60})
    imagecarousel = ImageSpecField(source='image',
                                   processors=[ResizeToFill(768, 500)],
                                   format='png',
                                   options={'quality': 60})

    project = models.ForeignKey(
        Project, null=False, blank=False, on_delete=models.CASCADE, related_name='images')


class Projectfile(models.Model):
    name = models.CharField(null=True, blank=False, max_length=200,
                            verbose_name='Nombre (obligatorio)', unique=True)
    file = models.FileField(upload_to='project_documents', validators=[
        FileExtensionValidator(['pdf'], message='Solo se permiten archivos PDF.'), validate_file_size_twenty])
    project = models.ForeignKey(
        Project, null=False, blank=False, on_delete=models.CASCADE, related_name='files')
