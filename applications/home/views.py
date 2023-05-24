from django.shortcuts import render
from applications.projects.models import Project

from django.views.generic import (
    TemplateView,
)

class HomePageView(TemplateView):
    template_name = 'home/index.html'

class NavBarView(TemplateView):
    template_name = 'modules/navbar.html'
    model = Project

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Contexto para barra búsqueda
        context['search'] = Project.objects.search_projects(self.object)

        return context
