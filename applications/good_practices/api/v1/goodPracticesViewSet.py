from rest_framework import viewsets
#
from applications.good_practices.models import (
    GoodPractices,
)
#
from .goodPracticesSerializer import (
    GoodPracticesSerializerV1
)


class GoodPracticesViewSet(viewsets.ModelViewSet):
    serializer_class = GoodPracticesSerializerV1
    queryset = GoodPractices.objects.all()