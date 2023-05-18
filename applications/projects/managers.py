from django.db import models
from django.db.models import Q

class ProjectsManager(models.Manager):
    def filter_projects(self, programs=None, types=None, years=None, regiones=None, comunas=None, keywords=None, program_name=None, type_name=None):
        projects = self.filter(public=True)

        if programs:
            projects = projects.filter(program__in=programs)
        if types:
            projects = projects.filter(type__in=types)
        if years:
            projects = projects.filter(year__in=years)
        if regiones:
            projects = projects.filter(region__in=regiones)
        if comunas:
            projects = projects.filter(comuna__in=comunas)

        if program_name and type_name:
            projects = projects.filter(program__name=program_name, type__name=type_name)

        if keywords:
            projects = projects.filter(
                Q(name__icontains=keywords) |
                Q(description__icontains=keywords)
            )

        return projects

    def search_projects(self, keywords):
        projects = self.filter(public=True)

        if keywords:
            projects = projects.filter(
                Q(name__icontains=keywords) |
                Q(description__icontains=keywords)
            )

        return projects