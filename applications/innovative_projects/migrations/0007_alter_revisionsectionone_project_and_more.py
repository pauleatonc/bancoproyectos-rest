# Generated by Django 4.2.2 on 2023-09-26 12:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('innovative_projects', '0006_revisionsectionone_project_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='revisionsectionone',
            name='project',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='revision_section_one', to='innovative_projects.innovativeprojects'),
        ),
        migrations.AlterField(
            model_name='revisionsectiontwo',
            name='project',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='revision_section_two', to='innovative_projects.innovativeprojects'),
        ),
    ]
