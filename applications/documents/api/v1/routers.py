from rest_framework.routers import DefaultRouter
from django.urls import path, include
#
from . import documentsViewSet

app_name = 'documents_app'

# Create a router and register our viewsets with it.
router = DefaultRouter()

router.register(r'documents/v1', documentsViewSet.DocumentsViewSet, basename="documents-v1")

urlpatterns = [
    path('', include(router.urls)),
]