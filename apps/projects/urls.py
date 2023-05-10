from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views

app_name = 'projects'
urlpatterns = [
    path('', views.index, name='index'),
    path('search', views.search, name='search'),
    path('search/<int:project_id>/', views.project, name='project'),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)