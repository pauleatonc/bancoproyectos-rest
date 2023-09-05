from rest_framework import serializers
#
from applications.innovative_projects.models import (
    InnovativeProjects,
    InnovativeGalleryImage,
    InnovativeWebSource
)

from applications.projects.api.v1.projectSerializer import ProgramSerializerV1


class InnovativeGalleryImageSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = InnovativeGalleryImage
        fields = (
            'id',
            'image',
        )


class InnovativeWebSourceSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = InnovativeWebSource
        fields = (
            'id',
            'url',
        )


class InnovativeProjectsSerializerV1(serializers.ModelSerializer):

    program = ProgramSerializerV1()
    images = InnovativeGalleryImageSerializerV1(many=True)
    url = InnovativeWebSourceSerializerV1(many=True)

    class Meta:
        model = InnovativeProjects
        fields = (
            'id',
            'program',
            'title',
            'description',
            'portada',
            'images',
            'url'
        )