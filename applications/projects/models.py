from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

# Managers
from .managers import ProjectsManager

class Program(models.Model):
    name = models.CharField(max_length=200, verbose_name= 'Nombre')
    sigla = models.CharField(max_length=200, verbose_name= 'Sigla')

    def __str__(self):
        return self.sigla

class Guide(models.Model):
    name = models.CharField(max_length=200, verbose_name= 'Guías')
    guide = models.FileField(upload_to='project_documents', null=True, blank=True)

    def __str__(self):
        return self.name

class Type(models.Model):
    name = models.CharField(max_length=200, verbose_name= 'Typo de Proyecto')
    guides = models.ManyToManyField(Guide, related_name = 'guides')

    def __str__(self):
        return self.name
    
class Year(models.Model):
    number = models.CharField(max_length=4, verbose_name= 'Año')
    def __str__(self):
        return self.number

class Project(models.Model):
    name = models.CharField(max_length=200, verbose_name= 'Nombre (obligatorio)')
    id_subdere = models.CharField(max_length=200, verbose_name= 'ID SUBDERE (obligatorio)')
    description = models.TextField(verbose_name= 'Descripción (obligatorio)')
    year = models.ForeignKey(Year, null=True, blank=False, on_delete=models.SET_NULL, verbose_name= 'Año (obligatorio)')
    program = models.ForeignKey(Program, null=True, blank=False, on_delete=models.SET_NULL, verbose_name= 'Programa (obligatorio)')
    type = models.ForeignKey(Type, null=True, blank=False, on_delete=models.SET_NULL, verbose_name= 'Tipo de Proyecto (obligatorio)')
    public = models.BooleanField(default=True)
    video = models.CharField(max_length=200, null=True, blank=True, verbose_name= 'Youtube')
    portada = models.ImageField(upload_to='projects', null=True, blank=False, verbose_name= 'Foto miniatura (obligatorio)')
    portacard = ImageSpecField(source='portada',
                                      processors=[ResizeToFill(300, 300)],
                                      format='png',
                                      options={'quality': 60})
    beforeimage = models.ImageField(upload_to='projects', null=True, blank=True, verbose_name= 'Imagen Antes')
    beforeimageresize = ImageSpecField(source='beforeimage',
                                      processors=[ResizeToFill(800, 600)],
                                      format='png',
                                      options={'quality': 60})
    afterimage = models.ImageField(upload_to='projects', null=True, blank=True, verbose_name= 'Imagen Después')
    afterimageresize = ImageSpecField(source='afterimage',
                                      processors=[ResizeToFill(800, 600)],
                                      format='png',
                                      options={'quality': 60})


    eett = models.FileField(upload_to='project_documents', null=True, blank=False, verbose_name= 'EETT')
    presupuesto = models.FileField(upload_to='project_documents', null=True, blank=False, verbose_name= 'Presupuesto')

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

    project = models.ForeignKey(Project, null=False, blank=False, on_delete=models.CASCADE, related_name= 'images')
    
class Projectfile(models.Model):
    name = models.CharField(null=True, blank=False, max_length=200, verbose_name= 'Nombre (obligatorio)')
    file = models.FileField(upload_to='project_documents')
    project = models.ForeignKey(Project, null=False, blank=False, on_delete=models.CASCADE, related_name= 'files')
