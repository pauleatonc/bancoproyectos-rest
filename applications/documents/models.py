from django.core.validators import FileExtensionValidator
from django.db import models
# apps de terceros
from simple_history.models import HistoricalRecords
#
from applications.base.models import BaseModel
from .functions import validate_file_size_twenty


class DocumentType(models.Model):
    type = models.CharField(max_length=25, verbose_name='Tipo de Documento', unique=True)

    class Meta:
        verbose_name = 'Tipo de Documento'
        verbose_name_plural = 'Tipos de Documento'

    def __str__(self):
        return self.type


class Documents(BaseModel):
    title = models.CharField(max_length=50, verbose_name='Título documento', unique=True)
    document = models.FileField(upload_to='documents',
                             validators=[
                                 FileExtensionValidator(
                                     ['pdf'], message='Solo se permiten archivos PDF.'), validate_file_size_twenty],
                             verbose_name='Documento')
    document_type = models.ForeignKey('DocumentType', verbose_name='Tipo de Documento', on_delete=models.CASCADE)
    public = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Documento'
        verbose_name_plural = 'Documentos'

    def __str__(self):
        return self.title
