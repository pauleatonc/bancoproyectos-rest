from rest_framework import viewsets
#
from applications.projects.models import (
    Program,
)
#
from .projectSerializer import (
    ProgramSerializerV1,
)


class ProgramViewSet(viewsets.ModelViewSet):
    serializer_class = ProgramSerializerV1
    queryset = Program.objects.all()