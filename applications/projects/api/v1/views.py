from django.shortcuts import render
from django.core.cache import cache
#
from django.views.generic import ListView, DetailView
#
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    DestroyAPIView,
    UpdateAPIView,
    RetrieveUpdateAPIView
)
#
from applications.projects.models import Project
#
from .serializer import (
    ProjectListSerializerV1,
    ProjectDetailSerializerV1
)


class ProjectListApiViewV1(ListAPIView):

    serializer_class = ProjectListSerializerV1

    def get_queryset(self):
        return Project.objects.all()


class ProjectDetailApiViewV1(RetrieveAPIView):

    serializer_class = ProjectDetailSerializerV1
    lookup_field = 'slug'

    def get_queryset(self):
        return Project.objects.all()