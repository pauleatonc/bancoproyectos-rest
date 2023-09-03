from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'projects_app'

urlpatterns = [
    path('list/',
         views.ProjectsListView.as_view(),
         name='project-list'
         ),
    path('project/<pk>/',
         views.ProjectDetailView.as_view(),
         name='project-detail'
         ),
    path('project-checklist/<pk>/',
         views.CheckListProgramView.as_view(),
         name='project_checklist'
         ),

    re_path('', include('applications.projects.api.v1.routers'))
]
