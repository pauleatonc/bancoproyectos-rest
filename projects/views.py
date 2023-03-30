from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.contrib.postgres.search import SearchQuery, SearchVector
from django.urls import reverse
from .filters import ProjectFilter
from .models import Project, Projectfile, Type, Projectimage
from .forms import ProjectFilterForm


def index(request):
    latest_project_list = Project.objects.order_by('-pub_date')[:5]
    context = {'latest_project_list': latest_project_list}
    return render(request, 'projects/index.html', context)


def search(request): 
    programa = request.GET.get('programa')
    q = request.GET.get('q')
    
    if programa:
        vector = SearchVector('program__sigla')
        query = SearchQuery(programa)          
        projects = Project.objects.annotate(search=vector).filter(search=query)

    elif q:
        vector2 = SearchVector('program__sigla', 'name', 'description', 'id_subdere')
        query2 = SearchQuery(q)
        projects = Project.objects.annotate(search=vector2).filter(search=query2)

    else:
        projects = Project.objects.all()

    context = {'projects': projects}
    return render(request, 'projects/search.html', context)


def project(request, project_id):  
    project = Project.objects.get(id=project_id)
    projectfile = Projectfile.objects.all().filter(project=project_id)
    type__id = Project.objects.get(id=project_id).type_id
    guide = Type.objects.get(id=type__id).guides.all()
    projectimage = Projectimage.objects.all().filter(project=project_id)
    projectlist = Project.objects.filter(type=type__id).exclude(id=project_id)
    context = {'project': project,
               'projectfiles': projectfile, 
               'guides' : guide, 
               'projectimages' : projectimage, 
               'projectlist' : projectlist, 
                 }
    return render(request, 'projects/project_view.html', context)


def __str__(self):
    return self.my_field_name


def get_absolute_url(self):
    """Returns the URL to access a particular instance of the model."""
    return reverse('model-detail-view', args=[str(self.id)])