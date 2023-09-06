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
    document_format = serializers.SerializerMethodField()

    class Meta:
        model = Documents
        fields = (
            'id',
            'title',
            'document',
            'document_type',
            'document_format'
        )

    def get_document_format(self, obj):
        # Retorna la extensión del archivo sin el punto
        return obj.document.name.split('.')[-1].upper()