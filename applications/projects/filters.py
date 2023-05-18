import django_filters
from .models import Project

class ProjectFilter(django_filters.FilterSet):
    # name = django_filters.ModelMultipleChoiceFilter(queryset=Project.objects.all())
    class Meta:
        model = Project
        fields = ['name', 'program__sigla', 'type', 'region', 'comuna']
