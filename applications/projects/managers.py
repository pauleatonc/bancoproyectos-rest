from django.db import models
from django.db.models import Q

class ProjectsManager(models.Manager):
    def browser_search_projects(self, program=None, region=None, comuna=None, type=None, year=None):
        queryset = self.get_queryset()

        if program:
            queryset = queryset.filter(program=program)

        if region:
            queryset = queryset.filter(comuna__region=region)

        if comuna:
            queryset = queryset.filter(comuna=comuna)

        if type:
            queryset = queryset.filter(type=type)

        if year:
            queryset = queryset.filter(year=year)

        return queryset

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


        
