from django.db import models

# Create your models here.
class BaseModel(models.Model):
    """Model definition for BaseModel"""

    id = models.AutoField(primary_key=True)
    state = models.BooleanField('Estado', default=True)
    created_date = models.DateTimeField('Fecha de creación', auto_now=False, auto_now_add=True)
    modified_date = models.DateTimeField('Fecha de Modificación', auto_now=True, auto_now_add=False)
    deleted_date = models.DateTimeField('Fecha de Eliminación', auto_now=True, auto_now_add=False)
    
    class Meta:
        abstract = True
        verbose_name= 'Modelo Base'