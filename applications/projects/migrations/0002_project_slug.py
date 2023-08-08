# Generated by Django 4.2.2 on 2023-08-08 13:23

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='slug',
            field=models.SlugField(default=django.utils.timezone.now, editable=False, max_length=300),
            preserve_default=False,
        ),
    ]
