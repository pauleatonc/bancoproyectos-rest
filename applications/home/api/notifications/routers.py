from rest_framework.routers import DefaultRouter
from django.urls import path, include
#
from . import notificationsViewSet

app_name = 'home_app'

# Create a router and register our viewsets with it.
router = DefaultRouter()

router.register(r'notifications/v1', notificationsViewSet.NotificationViewSet, basename="notifications-v1")

urlpatterns = [
    path('', include(router.urls)),
]