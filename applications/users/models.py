from django.db import models

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .functions import validar_rut

from .managers import UserManager

class Profesion(models.Model):
    ocupation = models.CharField('Profesión', max_length=20, unique=True)

class User(AbstractBaseUser, PermissionsMixin):

    rut = models.CharField(max_length=10, validators=[validar_rut], unique=True)
    nombres = models.CharField(max_length=30, blank=True)
    apellidos = models.CharField(max_length=30, blank=True)
    password = models.CharField(max_length=200, blank=True)


    is_staff = models.BooleanField('Usuario administrador',default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'rut'

    REQUIRED_FIELDS = ['username', 'email']

    objects = UserManager()

    def get_short_name(self):
        return self.email

    def get_full_name(self):
        return self.nombres + ' ' +self.apellidos