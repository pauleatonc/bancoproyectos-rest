from rest_framework import viewsets
#
from applications.projects.models import (
    Type,
)
#
from .projectSerializer import (
    TypeSerializerV1,
)


class ProgramViewSet(viewsets.ModelViewSet):
    serializer_class = TypeSerializerV1
    queryset = Type.objects.all()