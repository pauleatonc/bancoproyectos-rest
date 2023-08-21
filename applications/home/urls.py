from django.urls import path, re_path, include

from . import views

app_name = 'home_app'

urlpatterns = [
    path(
        '',
        views.HomePageView.as_view(),
        name='index',
        ),
    path(
        'register-contact',
        views.ContactCreateView.as_view(),
        name = 'add-contact'
    ),
    path(
        'contact-success',
        views.ContactSuccess.as_view(),
        name = 'contact_success'
    ),

    re_path('', include('applications.home.api.v1.urls'))
    
]