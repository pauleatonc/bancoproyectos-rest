from django.db import models

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

    import datetime
    YEAR_CHOICES = []
    for r in range(1980, (datetime.datetime.now().year+1)):
        YEAR_CHOICES.append((r,r))
    pub_date = models.DateTimeField(('Año'), choices=YEAR_CHOICES, default=datetime.datetime.now().year)

    def __str__(self):
        return self.name

class Projectimage(models.Model):
    image = models.ImageField(upload_to='images')
    project = models.ForeignKey(Project, null=False, blank=False, on_delete=models.CASCADE, related_name= 'images')
    
class Projectfile(models.Model):
    name = models.CharField(null=True, blank=False, max_length=200, verbose_name= 'Nombre')
    file = models.FileField(upload_to='documents')
    project = models.ForeignKey(Project, null=False, blank=False, on_delete=models.CASCADE, related_name= 'files')
