from django.urls import path, include, re_path

app_name = 'good_practices_app'

urlpatterns = [

    re_path('', include('applications.good_practices.api.v1.routers'))
]
