from rest_framework.routers import DefaultRouter
from django.urls import path, include
#
from . import projectsViewSet, programsViewSet

app_name = 'projects_app'

# Create a router and register our viewsets with it.
router = DefaultRouter()

router.register(r'projects/v1', projectsViewSet.ProjectViewSet, basename="projects-v1")
router.register(r'programs/v1', programsViewSet.ProgramViewSet, basename="programs-v1")

urlpatterns = [
    path('', include(router.urls)),
]