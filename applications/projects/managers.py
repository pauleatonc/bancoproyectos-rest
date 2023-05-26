from django.db import models
from django.db.models import Q

class ProjectsManager(models.Manager):
    def browser_search_projects(self, program=None, region=None, comuna=None, type=None, year=None, search_query=None):
        queryset = self.get_queryset()

        # Crear una lista vacía para almacenar las condiciones de filtro
        conditions = []

        # Agregar las condiciones de filtro según los parámetros enviados
        if program:
            conditions.append(Q(program__in=program))
        if region:
            conditions.append(Q(comuna__region__in=region))
        if comuna:
            conditions.append(Q(comuna__in=comuna))
        if type:
            conditions.append(Q(type__in=type))
        if year:
            conditions.append(Q(year__in=year))

        # Unir las condiciones con operador OR para obtener los resultados que cumplan al menos una de las condiciones
        if conditions:
            queryset = queryset.filter(*conditions)

        if search_query:
            # Filtrar los objetos del modelo Project utilizando la palabra clave
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(id_subdere__icontains=search_query) |
                Q(program__icontains=search_query) |
                Q(comuna__icontains=search_query) |
                Q(comuna__region__icontains=search_query) |
                Q(type__icontains=search_query) |
                Q(year__icontains=search_query)
            ).order_by('year')

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


        
