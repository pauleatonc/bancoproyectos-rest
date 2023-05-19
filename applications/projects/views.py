from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Project, Program, Type, Year
from applications.regioncomuna.models import Region, Comuna
from django.http import HttpResponseRedirect, JsonResponse
from .forms import ProjectFilterForm
from django.db.models import Q
from .managers import ProjectsManager


def get_index_data():
    programs = Program.objects.all()
    types = Type.objects.all()
    years = Year.objects.all()
    regiones = Region.objects.all()
    comunas = Comuna.objects.all()

    data = {
        'programs': programs,
        'types': types,
        'years': years,
        'regiones': regiones,
        'comunas': comunas,
    }

    return data


class ProjectsListView(ListView):
    model = Project
    template_name = 'projects/list.html'
    context_object_name = 'projects'
    paginate_by = 15

    def get_queryset(self):
        form = ProjectFilterForm(self.request.GET)
        if form.is_valid():
            program = form.cleaned_data.get('program')
            programs=[program] if program else []
            type = form.cleaned_data.get('type')
            types = [type] if type else []
            year = form.cleaned_data.get('year')
            years = [year] if year else []
            region = form.cleaned_data.get('region')
            regiones = [region] if region else []
            comuna = form.cleaned_data.get('comuna')
            comunas = [comuna] if comuna else []
            search = form.cleaned_data.get('search')
            show_all = form.cleaned_data.get('show_all')

            projects = Project.objects.filter(public=True)

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

            if search:
                projects = projects.filter(
                    Q(name__icontains=search) | Q(description__icontains=search)
                )

            if show_all:
                projects = projects.order_by('year')
            else:
                projects = projects.order_by('year')[:self.paginate_by]

            return projects
        else:
            return Project.objects.none()
    
    def get(self, request, *args, **kwargs):
        show_all = request.GET.get('show_all')

        if show_all:
            return HttpResponseRedirect(request.path)

        return super().get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(get_index_data())
        context['filter_form'] = ProjectFilterForm(self.request.GET)
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


def obtener_comunas(request):
    region_id = request.GET.get('region')
    comunas = Comuna.objects.filter(region_id=region_id).values('id', 'nombre')
    return JsonResponse(list(comunas), safe=False)
