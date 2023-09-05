from rest_framework import viewsets
#
from applications.innovative_projects.models import (
    InnovativeProjects,
)
#
from .innovativeProjectSerializer import (
    InnovativeProjectsSerializerV1
)


class InnovativeProjectsViewSet(viewsets.ModelViewSet):
    serializer_class = InnovativeProjectsSerializerV1
    queryset = InnovativeProjects.objects.all()