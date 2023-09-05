from rest_framework.routers import DefaultRouter
from django.urls import path, include
#
from . import innovativeProjectsViewSet

app_name = 'innovative_projects_app'

# Create a router and register our viewsets with it.
router = DefaultRouter()

router.register(r'innovative_projects/v1', innovativeProjectsViewSet.InnovativeProjectsViewSet, basename="innovative-projects-v1")

urlpatterns = [
    path('', include(router.urls)),
]