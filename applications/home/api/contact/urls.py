from django.urls import path
from .views import ContactCreate

urlpatterns = [
    path('contact/v1/', ContactCreate.as_view(), name='api-contact-create-v1'),
]