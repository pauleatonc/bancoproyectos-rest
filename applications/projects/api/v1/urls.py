from django.urls import path
from . import views

app_name = 'projects_app'

urlpatterns = [
    path('api/project/v1/list/',
         views.ProjectListApiViewV1.as_view(),
         name='api-project-list-v1'
         ),
    path('api/project/v1/<slug:slug>/',
         views.ProjectDetailApiViewV1.as_view(),
         name='api-project-detail-v1'
         ),
    path('api/project/v1/filter/',
         views.FilterOptionsAPIViewV1.as_view(),
         name='api-project-filter-v1'
         ),
]
