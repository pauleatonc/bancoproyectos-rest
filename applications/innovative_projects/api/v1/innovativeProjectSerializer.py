from rest_framework import serializers
#
from applications.innovative_projects.models import (
    Program,
    InnovativeProjects,
    InnovativeGalleryImage,
    InnovativeWebSource
)


class ProgramSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = (
            'id',
            'name',
            'sigla',
            'icon_program'
        )


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
            'title',
            'description',
            'portada',
            'images',
            'url'
        )