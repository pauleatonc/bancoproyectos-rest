from django.shortcuts import render
from django.urls import reverse_lazy, reverse
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.views.generic import ListView
from .models import Project
from applications.regioncomuna.models import Comuna
from django.http import JsonResponse

from django.views.generic import (
    ListView,
    DetailView,
    FormView
)

# Models
from .models import Project

#Forms
from .forms import ProjectFilterForm, LocationForm

def index(request):
    projects = Project.objects.index_projects()
    context = {
        'projects': projects,
        'project_filter_form': ProjectFilterForm(),
        'locacion_form': LocationForm()
    }
    return render(request, 'modules/browser.html', context)

class ProjectsListView(ListView):
    model = Project
    template_name = 'projects/list.html'
    context_object_name = 'projects'

    def get_queryset(self):
        projects = Project.objects.index_projects()
        return projects

class ProjectDetailView(DetailView):
    template_name = 'projects/project_view.html'
    context_object_name = 'project'
    model = Project

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Contexto para Archivos de Proyecto
        context['projectfiles'] = self.object.files.all()
        # Contexto para carrousel de imágenes
        context['projectimages'] = self.object.images.all()
        # Contexto para guías de diseño
        context['guides'] = self.object.type.guides.all()
        # Contexto para proyectos relacionados
        context['projectlist'] = Project.objects.related_projects(self.object)
        # Contexto para usuario autenticado
        context['user'] = self.request.user

        return context


'''class SearchProjectView(FormView):
    template_name = 'modules/browser.html'

    def get_context_data(self, **kwargs):
        context = super(SearchProjectView, self).get_context_data(**kwargs)
        # sistema de filtro
        context['search'] = Project.objects.buscar_proyecto()

        return context'''

def obtener_comunas(request):
    region_id = request.GET.get('region')
    comunas = Comuna.objects.filter(region_id=region_id).values('id', 'name')
    return JsonResponse(list(comunas), safe=False)
