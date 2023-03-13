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
    name = models.CharField(max_length=200, verbose_name= 'Nombre')
    id_subdere = models.CharField(max_length=200, verbose_name= 'ID SUBDERE')
    description = models.TextField(verbose_name= 'Descripción')
    program = models.ForeignKey(Program, null=True, blank=False, on_delete=models.SET_NULL, verbose_name= 'Programa')
    type = models.ForeignKey(Type, null=True, blank=False, on_delete=models.SET_NULL, verbose_name= 'Tipo de Proyecto')
    portada = models.ImageField(upload_to='images', null=True, blank=False)
    portadabanner = ImageSpecField(source='portada',
                                      processors=[ResizeToFill(1208, 300)],
                                      format='png',
                                      options={'quality': 60})
    portacard = ImageSpecField(source='portada',
                                      processors=[ResizeToFill(200, 200)],
                                      format='png',
                                      options={'quality': 60})

    eett = models.FileField(upload_to='documents', null=True, blank=False, verbose_name= 'EETT')
    presupuesto = models.FileField(upload_to='documents', null=True, blank=False, verbose_name= 'Presupuesto')

    pub_date = models.DateTimeField(verbose_name= 'Año')

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
    name = models.CharField(null=True, blank=False, max_length=200, verbose_name= 'Nombre')
    file = models.FileField(upload_to='documents')
    project = models.ForeignKey(Project, null=False, blank=False, on_delete=models.CASCADE, related_name= 'files')
