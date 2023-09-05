# Generated by Django 4.2.2 on 2023-09-04 23:42

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0006_alter_checklistdocuments_options_alter_guide_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='InnovativeProjects',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=23, unique=True, verbose_name='Título (obligatorio)')),
                ('description', models.TextField(verbose_name=django.core.validators.MinLengthValidator(280, 'La descripción debe tener al menos 280 carácteres.'))),
                ('portada', imagekit.models.fields.ProcessedImageField(null=True, upload_to='projects', verbose_name='Foto portada (obligatorio)')),
                ('program', models.ManyToManyField(to='projects.program', verbose_name='Programa (obligatorio)')),
            ],
        ),
        migrations.AlterField(
            model_name='historicalproject',
            name='portada',
            field=models.TextField(max_length=100, null=True, verbose_name='Foto portada (obligatorio)'),
        ),
        migrations.AlterField(
            model_name='project',
            name='portada',
            field=imagekit.models.fields.ProcessedImageField(null=True, upload_to='projects', verbose_name='Foto portada (obligatorio)'),
        ),
        migrations.CreateModel(
            name='InnovativeWebSource',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField()),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='web_sources', to='projects.innovativeprojects')),
            ],
        ),
        migrations.CreateModel(
            name='InnovativeGaleryImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', imagekit.models.fields.ProcessedImageField(blank=True, null=True, upload_to='galery_images')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='galery_images', to='projects.innovativeprojects')),
            ],
        ),
    ]
