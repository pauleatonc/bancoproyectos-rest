from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
#
from applications.good_practices.models import (
    GoodPractices,
)
#
from .goodPracticesSerializer import (
    GoodPracticesSerializerV1
)

from applications.users.permissions import is_admin


class GoodPracticesViewSet(viewsets.ModelViewSet):
    serializer_class = GoodPracticesSerializerV1
    queryset = GoodPractices.objects.filter(public=True)

    def create(self, request, *args, **kwargs):
        if not is_admin(request.user):
            raise PermissionDenied(detail="No tienes permiso para realizar esta acción.")
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if not is_admin(request.user):
            raise PermissionDenied(detail="No tienes permiso para realizar esta acción.")
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if not is_admin(request.user):
            raise PermissionDenied(detail="No tienes permiso para realizar esta acción.")
        return super().destroy(request, *args, **kwargs)