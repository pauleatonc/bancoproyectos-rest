# Generated by Django 4.2.2 on 2023-09-28 19:35

import applications.projects.functions
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0016_historicaltype_historicalproject_historicalprogram_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalprogram',
            name='guide',
            field=models.TextField(blank=True, max_length=100, null=True, validators=[django.core.validators.FileExtensionValidator(['pdf'], message='Solo se permiten archivos PDF.'), applications.projects.functions.validate_file_size_five], verbose_name='Guía programática'),
        ),
        migrations.AddField(
            model_name='historicaltype',
            name='program',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='projects.program', verbose_name='Programa (obligatorio)'),
        ),
        migrations.AddField(
            model_name='program',
            name='guide',
            field=models.FileField(blank=True, null=True, upload_to='program_documents', validators=[django.core.validators.FileExtensionValidator(['pdf'], message='Solo se permiten archivos PDF.'), applications.projects.functions.validate_file_size_five], verbose_name='Guía programática'),
        ),
        migrations.AddField(
            model_name='type',
            name='program',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='projects.program', verbose_name='Programa (obligatorio)'),
        ),
    ]