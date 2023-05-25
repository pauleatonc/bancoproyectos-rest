from django.shortcuts import render
from applications.projects.models import Project, Program, Type
from applications.projects.views import ProjectsListView

from django.views.generic import (
    View,
    TemplateView,
)

class HomePageView(ProjectsListView):
    template_name = 'home/index.html'
    model = Project



