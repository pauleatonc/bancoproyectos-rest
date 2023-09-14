from django.urls import include, re_path

app_name = 'projects_app'

urlpatterns = [

    re_path('', include('applications.projects.api.v1.routers'))
]
