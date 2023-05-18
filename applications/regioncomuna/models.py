from django.db import models

#managers
from .managers import RegionManager, ComunaManager


class Region(models.Model):
    nombre = models.CharField(max_length=100)
    objects = RegionManager()
    
    def __str__(self):
        return self.nombre


class Comuna(models.Model):
    nombre = models.CharField(max_length=100)
    region = models.ForeignKey(
        Region, on_delete=models.CASCADE, related_name='comunas')
    objects = ComunaManager()   
    
    def __str__(self):
        return self.nombre