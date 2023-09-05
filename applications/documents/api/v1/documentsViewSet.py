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
    queryset = Documents.objects.all()