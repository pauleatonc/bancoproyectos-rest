# Generated by Django 4.2.2 on 2023-09-28 19:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('good_practices', '0003_historicalgoodpractices'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='goodpractices',
            name='state',
        ),
        migrations.RemoveField(
            model_name='historicalgoodpractices',
            name='state',
        ),
    ]
