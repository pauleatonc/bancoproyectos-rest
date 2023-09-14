from django.urls import path, include, re_path

from .views import Login, Logout, UserToken

app_name = 'users_app'

urlpatterns = [

    re_path('', include('applications.users.api.v1.urls')),

    path(
        'login/',
        Login.as_view(),
        name='login',
    ),

    path(
        'refresh_token/',
        UserToken.as_view(),
        name='refresh-token',
    ),

    path(
        'logout/',
        Logout.as_view(),
        name='user-logout',
    ),

    
]