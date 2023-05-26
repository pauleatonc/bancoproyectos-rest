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
        queryset = super().get_queryset()

        # Obtener los parámetros del filtro de búsqueda
        program = self.request.GET.get('program')
        region = self.request.GET.get('region')
        comuna = self.request.GET.get('comuna')
        type = self.request.GET.get('type')
        year = self.request.GET.get('year')

        if program or region or comuna or type or year:
            # Crear una lista vacía para almacenar las condiciones de filtro
            conditions = []

            # Agregar las condiciones de filtro según los parámetros enviados
            if program:
                conditions.append(Q(program=program))
            if region:
                conditions.append(Q(comuna__region=region))
            if comuna:
                conditions.append(Q(comuna=comuna))
            if type:
                conditions.append(Q(type=type))
            if year:
                conditions.append(Q(year=year))

            # Unir las condiciones con operador OR para obtener los resultados que cumplan al menos una de las condiciones
            queryset = queryset.filter(*conditions)

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
        # Pasar los parámetros del filtro a la plantilla
        context['filter_program'] = self.request.GET.get('program')
        context['filter_region'] = self.request.GET.get('region')
        context['filter_comuna'] = self.request.GET.get('comuna')
        context['filter_type'] = self.request.GET.get('type')
        context['filter_year'] = self.request.GET.get('year')
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