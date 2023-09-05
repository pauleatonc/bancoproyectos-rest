from rest_framework import serializers
#
from applications.documents.models import (
    Documents,
    DocumentType
)


class DocumentTypeSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = (
            'id',
            'type',
        )


class DocumentsSerializerV1(serializers.ModelSerializer):

    document_type = DocumentTypeSerializerV1()

    class Meta:
        model = Documents
        fields = (
            'id',
            'title',
            'document',
            'document_type',
        )