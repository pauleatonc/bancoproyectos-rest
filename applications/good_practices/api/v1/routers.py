from rest_framework.routers import DefaultRouter
from django.urls import path, include
#
from . import goodPracticesViewSet

app_name = 'innovative_projects_app'

# Create a router and register our viewsets with it.
router = DefaultRouter()

router.register(r'good_practices/v1', goodPracticesViewSet.GoodPracticesViewSet, basename="good-practices-v1")

urlpatterns = [
    path('', include(router.urls)),
]