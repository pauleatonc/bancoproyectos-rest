from django.db import models


class ProjectsManager(models.Manager):

    def index_projects(self):
        return self.filter(
            public = True
        ).order_by('year')[:5]
