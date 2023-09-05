# Generated by Django 4.2.2 on 2023-09-05 12:17

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import imagekit.models.fields
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0011_remove_innovativegaleryimage_project_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='InnovativeProjects',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')),
                ('modified_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(auto_now=True, verbose_name='Fecha de Eliminación')),
                ('title', models.CharField(max_length=23, unique=True, verbose_name='Título (obligatorio)')),
                ('description', models.TextField(validators=[django.core.validators.MinLengthValidator(280, 'La descripción debe tener al menos 280 caracteres.')])),
                ('portada', imagekit.models.fields.ProcessedImageField(null=True, upload_to='projects', verbose_name='Foto portada (obligatorio)')),
                ('public', models.BooleanField(default=True)),
                ('program', models.ManyToManyField(to='projects.program', verbose_name='Programa (obligatorio)')),
            ],
            options={
                'verbose_name': 'Proyecto Innovador',
                'verbose_name_plural': 'Proyectos Innovadores',
            },
        ),
        migrations.CreateModel(
            name='InnovativeWebSource',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField()),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='web_sources', to='innovative_projects.innovativeprojects')),
            ],
        ),
        migrations.CreateModel(
            name='InnovativeGalleryImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', imagekit.models.fields.ProcessedImageField(blank=True, null=True, upload_to='innovative_gallery_images')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='innovative_gallery_images', to='innovative_projects.innovativeprojects')),
            ],
        ),
        migrations.CreateModel(
            name='HistoricalInnovativeProjects',
            fields=[
                ('id', models.IntegerField(blank=True, db_index=True)),
                ('state', models.BooleanField(default=True, verbose_name='Estado')),
                ('created_date', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de creación')),
                ('modified_date', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de Modificación')),
                ('deleted_date', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de Eliminación')),
                ('title', models.CharField(db_index=True, max_length=23, verbose_name='Título (obligatorio)')),
                ('description', models.TextField(validators=[django.core.validators.MinLengthValidator(280, 'La descripción debe tener al menos 280 caracteres.')])),
                ('portada', models.TextField(max_length=100, null=True, verbose_name='Foto portada (obligatorio)')),
                ('public', models.BooleanField(default=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical Proyecto Innovador',
                'verbose_name_plural': 'historical Proyectos Innovadores',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]
