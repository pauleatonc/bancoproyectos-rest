from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('search', views.search, name='search'),
    path('<int:project_id>/project', views.project, name='project'),
]