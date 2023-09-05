from django.urls import path, include, re_path

app_name = 'innovative_projects_app'

urlpatterns = [

    re_path('', include('applications.innovative_projects.api.v1.routers'))
]
