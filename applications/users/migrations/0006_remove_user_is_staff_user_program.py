# Generated by Django 4.2.2 on 2023-09-28 19:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0018_remove_checklistdocuments_state_remove_guide_state_and_more'),
        ('users', '0005_remove_user_tipo_usuario'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_staff',
        ),
        migrations.AddField(
            model_name='user',
            name='program',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='projects.program', verbose_name='Programa'),
        ),
    ]