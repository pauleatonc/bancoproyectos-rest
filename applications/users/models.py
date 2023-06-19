from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .functions import validar_rut
from .managers import UserManager
from applications.regioncomuna.models import Comuna


class Profesion(models.Model):
    ocupation = models.CharField('Profesión', max_length=20, unique=True)

class User(AbstractBaseUser, PermissionsMixin):

    USER_TYPE_CHOICES = (
        ('SUBDERE', 'SUBDERE'),
        ('BANCO', 'Banco de Proyectos'),
    )

    rut = models.CharField(max_length=15, validators=[validar_rut], unique=True)
    nombres = models.CharField(max_length=30, blank=True, null=True)
    primer_apellido = models.CharField(max_length=30, blank=True, null=True)
    segundo_apellido = models.CharField(max_length=30, blank=True, null=True)
    comuna = models.CharField(max_length=50, blank=True, null=True)
    tipo_usuario = models.CharField('SUBDERE o Banco de Proyectos', max_length=20, choices=USER_TYPE_CHOICES, default='Banco de Proyectos')
    password = models.CharField(max_length=200, blank=True)
    email = models.TextField(max_length=100, blank=True, null=True)

    #Setiando el nombre de usuario al rut
    USERNAME_FIELD = 'rut'    


    is_staff = models.BooleanField('Usuario administrador', default=False)
    is_active = models.BooleanField(default=True)

    #Campos requeridos
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_short_name(self):
        return self.nombres

    def get_full_name(self):
        return self.nombres + ' ' + self.primer_apellido + ' ' + self.segundo_apellido