from django.urls import path
from .views import ContactCreate

urlpatterns = [
    path('api/contact/v1/', ContactCreate.as_view(), name='api-contact-create-v1'),
]