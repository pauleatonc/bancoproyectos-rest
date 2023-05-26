from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Project, Program, Type, Year, ChecklistDocuments
from applications.regioncomuna.models import Region, Comuna
from django.http import HttpResponseRedirect, JsonResponse
from .forms import ProjectFilterForm
from django.db.models import Q
from .managers import ProjectsManager


class ProjectsListView(ListView):
    model = Project
    template_name = 'projects/list.html'
    context_object_name = 'projects'
    paginate_by = 6

    def get_queryset(self):
        # Obtener los parámetros del filtro de búsqueda
        program = self.request.GET.getlist('program')
        region = self.request.GET.getlist('region')
        comuna = self.request.GET.getlist('comuna')
        type = self.request.GET.getlist('type')
        year = self.request.GET.getlist('year')
        search_query = self.request.GET.get('search_query', '')

        queryset = Project.objects.browser_search_projects(program, region, comuna, type, year, search_query)



        # Ordenar los resultados según los campos elegidos
        sort_by = self.request.GET.get('sort_by')
        if sort_by == 'created':
            queryset = queryset.order_by('-id')
        elif sort_by == 'year':
            queryset = queryset.order_by('year')

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['programs'] = Program.objects.all()
        context['types'] = Type.objects.all()
        context['regiones'] = Project.objects.values_list('comuna__region', 'comuna__region__nombre').distinct()
        context['comunas'] = Project.objects.values_list('comuna', 'comuna__nombre').distinct()
        context['tipos'] = Project.objects.values_list('type', 'type__name').distinct()
        context['years'] = Project.objects.values_list('year', 'year__number').distinct()

        return context


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


class CheckListProgramView(ListView):
    model = Project
    template_name = 'projects/checklist_program.html'
    context_object_name = 'project'