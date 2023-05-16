from django.db import models
from django.db.models import Q

class ProjectsManager(models.Manager):

    def index_projects(self):
        return self.filter(
            public = True
        ).order_by('year')[:5]

    def related_projects(self, project):
        return self.filter(
            public=True,
            program=project.program,
            type=project.type
        ).exclude(
            id=project.id
        ).order_by('year')[:5]
