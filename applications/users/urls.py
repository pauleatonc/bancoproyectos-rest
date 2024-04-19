from django.urls import path, include, re_path

from .views import keycloak_code_exchange_view, refresh_token_view, logout_view

app_name = 'users_app'

urlpatterns = [

    re_path('', include('applications.users.api.v1.routers')),
    path(
         'callback/', keycloak_code_exchange_view, name='callback'
    ),
    
    path(
        'refresh_token/', refresh_token_view, name='refresh_token'
    ),
    path(
        'logout/', logout_view, name='logout'
    ),

]