from django.db import models

class Project(models.Model):
    project_name = models.CharField(max_length=200)
    id_subdere = models.CharField(max_length=200)
    project_description = models.TextField()

    pub_date = models.DateTimeField('date published')


