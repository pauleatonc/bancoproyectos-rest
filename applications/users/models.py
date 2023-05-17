from django.db import models

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .functions import validar_rut

from .managers import UserManager

class Profesion(models.Model):
    ocupation = models.CharField('Profesión', max_length=20, unique=True)

class User(AbstractBaseUser, PermissionsMixin):

    rut = models.CharField(max_length=10, validators=[validar_rut], unique=True)
    username = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    nombres = models.CharField(max_length=30, blank=True)
    apellidos = models.CharField(max_length=30, blank=True)
    #celular = models.CharField(max_length=10)
    #dirección = models.CharField(max_length=30, blank=True)
    #comuna = models.CharField(max_length=30, choices=COMUNAS_CHILE, blank=True)
    #region = models.CharField(max_length=30, choices=REGIONES_CHILE, blank=True)
    profesion = models.ForeignKey(Profesion, on_delete=models.SET_NULL, null=True)
    fecha_nacimiento = models.DateField('Fecha de nacimiento', blank=True, null=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    USERNAME_FIELD = 'rut'

    REQUIRED_FIELDS = ['username', 'email']

    objects = UserManager()

    def get_short_name(self):
        return self.email

    def get_full_name(self):
        return self.nombres + ' ' +self.apellidos