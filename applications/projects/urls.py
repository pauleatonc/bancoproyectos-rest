from django.urls import path
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
    path('api/project/list/',
         views.ProjectListApiView.as_view(),
         name='api-project-list'
         ),
    path('api/project/v1/<slug:slug>/',
         views.ProjectDetailApiView.as_view(),
         name='api-project-detail'
         ),
]
