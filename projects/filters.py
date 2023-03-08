import django_filters
from django import forms
from .models import Project

class ProjectFilter(django_filters.FilterSet):
    type = django_filters.ModelMultipleChoiceFilter(queryset=Project.objects.all())
    class Meta:
        model = Project
        fields = ['program__sigla', 'name', 'description', 'id_subdere']