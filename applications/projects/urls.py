from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from . import views

app_name = 'projects_app'

schema_view = get_schema_view(
   openapi.Info(
      title="Proyectos API",
      default_version='v1',
      description="Documentación de API de Proyectos de Banco de Proyectos",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

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

    re_path('', include('applications.projects.api.v1.routers')),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
