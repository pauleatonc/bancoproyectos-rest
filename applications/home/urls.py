from django.urls import re_path, include

app_name = 'home_app'

urlpatterns = [

    re_path('', include('applications.home.api.v1.urls'))
    
]