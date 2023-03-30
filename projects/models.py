from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

class Program(models.Model):
    name = models.CharField(max_length=200, verbose_name= 'Nombre')
    sigla = models.CharField(max_length=200, verbose_name= 'Sigla')

    def __str__(self):
        return self.sigla

class Guide(models.Model):
    name = models.CharField(max_length=200, verbose_name= 'Typo de Proyecto')
    guide = models.FileField(upload_to='documents', null=True, blank=True)

    def __str__(self):
        return self.name

class Type(models.Model):
    name = models.CharField(max_length=200, verbose_name= 'Typo de Proyecto')
    guides = models.ManyToManyField(Guide, related_name = 'guides')

    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(max_length=200, verbose_name= 'Nombre (obligatorio)')
    id_subdere = models.CharField(max_length=200, verbose_name= 'ID SUBDERE (obligatorio)')
    description = models.TextField(verbose_name= 'Descripción (obligatorio)')
    program = models.ForeignKey(Program, null=True, blank=False, on_delete=models.SET_NULL, verbose_name= 'Programa (obligatorio)')
    type = models.ForeignKey(Type, null=True, blank=False, on_delete=models.SET_NULL, verbose_name= 'Tipo de Proyecto (obligatorio)')
    video = models.CharField(max_length=200, null=True, blank=True, verbose_name= 'Youtube')
    portada = models.ImageField(upload_to='images', null=True, blank=False, verbose_name= 'Foto miniatura (obligatorio)')
    portacard = ImageSpecField(source='portada',
                                      processors=[ResizeToFill(300, 300)],
                                      format='png',
                                      options={'quality': 60})
    beforeimage = models.ImageField(upload_to='images', null=True, blank=True, verbose_name= 'Imagen Antes')
    beforeimageresize = ImageSpecField(source='beforeimage',
                                      processors=[ResizeToFill(800, 600)],
                                      format='png',
                                      options={'quality': 60})
    afterimage = models.ImageField(upload_to='images', null=True, blank=True, verbose_name= 'Imagen Después')
    afterimageresize = ImageSpecField(source='afterimage',
                                      processors=[ResizeToFill(800, 600)],
                                      format='png',
                                      options={'quality': 60})


    eett = models.FileField(upload_to='documents', null=True, blank=False, verbose_name= 'EETT')
    presupuesto = models.FileField(upload_to='documents', null=True, blank=False, verbose_name= 'Presupuesto')

    pub_date = models.DateTimeField(verbose_name= 'Año (obligatorio)')

    def __str__(self):
        return self.name

class Projectimage(models.Model):
    image = models.ImageField(upload_to='images')
    imagethumbnail = ImageSpecField(source='image',
                                      processors=[ResizeToFill(300, 300)],
                                      format='png',
                                      options={'quality': 60})

    project = models.ForeignKey(Project, null=False, blank=False, on_delete=models.CASCADE, related_name= 'images')
    
class Projectfile(models.Model):
    name = models.CharField(null=True, blank=False, max_length=200, verbose_name= 'Nombre (obligatorio)')
    file = models.FileField(upload_to='documents')
    project = models.ForeignKey(Project, null=False, blank=False, on_delete=models.CASCADE, related_name= 'files')
