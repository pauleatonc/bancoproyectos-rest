from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Project, Program, Type
from django.core.cache import cache


class ProjectsListView(ListView):
    template_name = 'projects/list.html'
    context_object_name = 'projects'
    paginate_by = 6

    def get_queryset(self):
        # Obtener los parámetros del filtro de búsqueda
        search_query = self.request.GET.get('search_query', '')
        program = self.request.GET.getlist('program', '')
        region = self.request.GET.getlist('region', '')
        comuna = self.request.GET.getlist('comuna', '')
        project_type = self.request.GET.getlist('type', '')
        year = self.request.GET.getlist('year', '')
        sort_by = self.request.GET.get('sort_by')
        cache_key = self.request.GET.get('cache_key')

        if cache_key:
            queryset = cache.get(cache_key)

            if queryset is None:
                queryset = Project.objects.browser_search_projects(
                    search_query=search_query,
                    program=program,
                    region=region,
                    comuna=comuna,
                    project_type=project_type,
                    year=year,
                    order_by=sort_by
                )
                cache.set(cache_key, queryset)
        else:
            queryset = Project.objects.browser_search_projects(
                search_query=search_query,
                program=program,
                region=region,
                comuna=comuna,
                project_type=project_type,
                year=year,
                order_by=sort_by
            )

        # Generar la clave de caché solo si hay resultados de búsqueda
            if queryset.exists():
                cache_key = self.generate_cache_key(
                    search_query=search_query,
                    program=program,
                    region=region,
                    comuna=comuna,
                    project_type=project_type,
                    year=year,
                    sort_by=sort_by
                )
                cache.set(cache_key, queryset)
            else:
                cache_key = None

        self.request.session['cache_key'] = cache_key

        if sort_by == 'id':
            queryset = queryset.order_by('-id')
        elif sort_by == 'year':
            queryset = queryset.order_by('year')

        return queryset

    def generate_cache_key(self, search_query, region=None, comuna=None, program=None, project_type=None, year=None, sort_by=None):
        def convert_list_to_str(lst):
            return [str(item) for item in lst]

        region = convert_list_to_str(region) if region else []
        comuna = convert_list_to_str(comuna) if comuna else []
        program = convert_list_to_str(program) if program else []
        project_type= convert_list_to_str(project_type) if project_type else []
        year = convert_list_to_str(year) if year else []

        cache_key = f"search_results:{search_query}:{':'.join(region)}:{':'.join(comuna)}:{':'.join(program)}:{':'.join(project_type)}:{':'.join(year)}:{sort_by}"
        return cache_key

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Obtener los parámetros de búsqueda seleccionados por el usuario
        search_query = self.request.GET.get('search_query', '')
        program = self.request.GET.getlist('program', [])
        region = self.request.GET.getlist('region', [])
        comuna = self.request.GET.getlist('comuna', [])
        project_type = self.request.GET.getlist('type', [])
        year = self.request.GET.getlist('year', [])
        sort_by = self.request.GET.get('sort_by')
        cache_key = self.request.session.get('cache_key')

        # Obtener la cantidad total de proyectos existentes
        total_projects = Project.objects.count()

        # Obtener la cantidad de proyectos del resultado de la búsqueda
        search_projects = self.get_queryset().count()

        # Pasar los parámetros seleccionados al contexto
        context['search_query'] = search_query
        context['selected_programs'] = program
        context['selected_comunas'] = comuna
        context['selected_regions'] = self.request.GET.getlist('region', [])
        context['selected_types'] = self.request.GET.getlist('type', [])
        context['selected_years'] = self.request.GET.getlist('year', [])
        context['sort_by'] = sort_by
        context['total_projects'] = total_projects
        context['search_projects'] = search_projects
        context['cache_key'] = cache_key

        # Obtener otros datos necesarios para el contexto
        context['programs'] = Program.objects.all()
        context['regiones'] = Project.objects.values_list(
            'comuna__region', 'comuna__region__nombre').distinct()
        context['comunas'] = Project.objects.values_list(
            'comuna', 'comuna__nombre').distinct()
        context['tipos'] = Type.objects.values_list(
            'id', 'name', 'icon_type').distinct()
        context['years'] = Project.objects.values_list(
            'year', 'year__number').distinct()

        
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
