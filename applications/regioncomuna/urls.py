from django.urls import path
from .views import seleccionar_locacion 


urlpatterns = [
    path('', seleccionar_locacion,
        name='seleccionar-locacion'),
]
