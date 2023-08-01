from django.urls import path
from . import views


urlpatterns = [
    path(
        'api/region-comuna/',
        views.RegionComunaView.as_view(),
        name = 'region-comuna'
    ),
]
