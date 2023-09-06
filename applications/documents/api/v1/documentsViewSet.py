from rest_framework import viewsets
#
from applications.documents.models import (
    Documents,
)
#
from .documentsSerializer import (
    DocumentsSerializerV1
)


class DocumentsViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentsSerializerV1

    def get_queryset(self):
        return Documents.objects.filter(public=True)