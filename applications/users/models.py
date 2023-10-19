from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
#
from django.db import models
from .functions import validar_rut
from .managers import UserManager
from applications.regioncomuna.models import Comuna
from applications.projects.models import Program
# apps de terceros
from simple_history.models import HistoricalRecords


class Profesion(models.Model):
    ocupation = models.CharField('Profesión', max_length=20, unique=True)

    class Meta:
        verbose_name= 'Profesión'
        verbose_name_plural= 'Profesiones'

class User(AbstractBaseUser, PermissionsMixin):

    rut = models.CharField(max_length=15, validators=[validar_rut], unique=True)
    nombres = models.CharField(max_length=30, blank=True, null=True)
    primer_apellido = models.CharField(max_length=30, blank=True, null=True)
    segundo_apellido = models.CharField(max_length=30, blank=True, null=True)
    comuna = models.CharField(max_length=50, blank=True, null=True)
    password = models.CharField(max_length=200, blank=True)
    email = models.TextField(max_length=100, blank=True, null=True)
    institucion = models.CharField(max_length=50, blank=True, null=True)
    program = models.ForeignKey(Program, null=True, blank=True,
                                on_delete=models.SET_NULL, verbose_name='Programa')

    #Seteando el nombre de usuario al RUT
    USERNAME_FIELD = 'rut'

    is_staff = models.BooleanField('Usuario administrador', default=False)
    is_active = models.BooleanField(default=True)

    historical_date = HistoricalRecords(user_model='users.User', inherit=True)

    #Campos requeridos
    REQUIRED_FIELDS = ['email']

    objects = UserManager()

    def get_short_name(self):
        return self.nombres

    def get_full_name(self):
        return ' '.join(part for part in [self.nombres, self.primer_apellido, self.segundo_apellido] if part)

    def save(self, *args, **kwargs):
        # Formatear el RUT antes de guardar
        rut_formateado = validar_rut(self.rut)
        self.rut = rut_formateado
        super().save(*args, **kwargs)

    class Meta:
        verbose_name= 'Usuario'
        verbose_name_plural= 'Usuarios'