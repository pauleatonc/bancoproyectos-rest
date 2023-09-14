from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework.documentation import include_docs_urls
from django.conf import settings
from django.conf.urls.static import static

#urls errores 
from django.conf.urls import handler404 , handler500

# Swagger para documentación de la API
from rest_framework import permissions
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

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
    path('admin/', admin.site.urls),
    path('docs/', include_docs_urls(title='Banco de Proyectos API')),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    re_path('', include('applications.projects.urls')),
    re_path('', include('applications.home.urls')),
    re_path('', include('applications.users.urls')),
    re_path('', include('applications.regioncomuna.urls')),
    re_path('', include('applications.innovative_projects.urls')),
    re_path('', include('applications.good_practices.urls')),
    re_path('', include('applications.documents.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)