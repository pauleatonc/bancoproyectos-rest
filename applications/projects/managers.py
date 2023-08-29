from django.db import models
from django.db.models import Q



class ProjectsManager(models.Manager):

    def browser_search_projects(self, search_query, program, region, comuna, project_type, year, order_by):
        queryset = self.filter(public=True)

        if search_query and len(search_query) > 0:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(id_subdere__icontains=search_query) |
                Q(region__icontains=search_query)
            )

        if program and len(program) > 0:
            queryset = queryset.filter(program__in=program)
        if region and len(region) > 0:
            queryset = queryset.filter(comuna__region__in=region)
        if comuna and len(comuna) > 0:
            queryset = queryset.filter(comuna__in=comuna)
        if project_type and len(project_type) > 0:
            queryset = queryset.filter(type__in=project_type)
        if year and len(year) > 0:
            queryset = queryset.filter(year__in=year)

        if order_by == 'id':
            queryset = queryset.order_by('-id')
        elif order_by == 'year':
            queryset = queryset.order_by('year')

        return queryset

    def index_projects(self):
        return self.filter(
            public=True
        ).order_by('year')[:6]

    def related_projects(self, project):
        return self.filter(
            public=True,
            program=project.program,
            type=project.type
        ).exclude(
            id=project.id
        ).order_by('year')[:6]