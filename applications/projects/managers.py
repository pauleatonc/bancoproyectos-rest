from django.db import models
from django.db.models import Q


class ProjectsManager(models.Manager):

    def browser_search_projects(self, search_query, program, region, comuna, project_type, year, order_by):
        queryset = self.filter(public=True)

        if len(search_query) > 0:
            queryset = queryset.filter(
                models.Q(name__icontains=search_query) |
                models.Q(id_subdere__icontains=search_query)
            )

        if program:
            queryset = queryset.filter(program__in=program)
        if region:
            queryset = queryset.filter(comuna__region__in=region)
        if comuna:
            queryset = queryset.filter(comuna__in=comuna)
        if project_type:
            queryset = queryset.filter(type__in=project_type)
        if year:
            queryset = queryset.filter(year__in=year)


        if order_by == 'id':
            queryset = queryset.order_by('-id')
        elif order_by == 'year':
            queryset = queryset.order_by('year')

        return queryset


    def index_projects(self):
        return self.filter(
            public=True
        ).order_by('year')[:5]

    def related_projects(self, project):
        return self.filter(
            public=True,
            program=project.program,
            type=project.type
        ).exclude(
            id=project.id
        ).order_by('year')[:5]
