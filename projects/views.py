from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.contrib.postgres.search import SearchQuery, SearchVector
from django.urls import reverse

from .models import Project


def index(request):
    latest_project_list = Project.objects.order_by('-pub_date')[:5]
    context = {'latest_project_list': latest_project_list}
    return render(request, 'projects/index.html', context)


def search(request):

    q = request.GET.get('q')

    if q:
        vector = SearchVector('project_name', 'project_description', 'id_subdere')
        query = SearchQuery(q)

        projects = Project.objects.annotate(search=vector).filter(search=query)
    else:
        projects = Project.objects.all()

    context = {'projects': projects}
    return render(request, 'projects/search.html', context)
    

def project(request, project_id):
    
    project_list = Project.objects.all()
    context = {'project_list': project_list}
    return render(request, 'projects/project_view.html')


def __str__(self):
    return self.my_field_name


def get_absolute_url(self):
    """Returns the URL to access a particular instance of the model."""
    return reverse('model-detail-view', args=[str(self.id)])