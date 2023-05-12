from django.shortcuts import render
from django.urls import reverse_lazy, reverse
from django.http import HttpResponseRedirect
from django.contrib import messages

from django.views.generic import (
    ListView,
    DetailView
)

# Models
from .models import Project


class ProjectsListView(ListView):
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
        return context
