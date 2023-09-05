from django.urls import path, include, re_path

app_name = 'documents_app'

urlpatterns = [

    re_path('', include('applications.documents.api.v1.routers'))
]
