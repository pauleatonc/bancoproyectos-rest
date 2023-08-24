from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'projects_app'

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'v1', views.ProjectViewSet, basename="v1")

urlpatterns = [
    path('api/project/', include(router.urls)),
]