from django.db import models


class ProjectsManager(models.Manager):

    def index_projects(self):
        return self.filter(
            public = True
        ).order_by('year')[:5]
        
    def filtered(self, region_id=None, comuna_id=None):
        qs = self.get_queryset()
        if region_id:
            qs = qs.filter(region_id=region_id)
        if comuna_id:
            qs = qs.filter(comuna_id=comuna_id)
        return qs

#logica de filtro 
