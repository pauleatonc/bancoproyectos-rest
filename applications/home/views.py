from django.shortcuts import render
from applications.projects.models import Project, Program, Type
from applications.home.models import Contact
from applications.projects.views import ProjectsListView

from django.views.generic import (
    View,
    TemplateView,
    CreateView
)

# forms
from .forms import ContactForm

class HomePageView(ProjectsListView):
    template_name = 'home/index.html'
    model = Project


class ContactCreateView(CreateView):
    template_name = 'home/contact.html'
    form_class = ContactForm
    model = Contact
    success_url = '.'
