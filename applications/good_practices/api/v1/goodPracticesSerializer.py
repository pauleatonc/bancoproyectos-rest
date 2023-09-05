from rest_framework import serializers
#
from applications.good_practices.models import (
    GoodPractices,
    GoodPracticesWebSource,
    GoodPracticesGalleryImage
)

from applications.projects.api.v1.projectSerializer import ProgramSerializerV1


class GoodPracticesGalleryImageSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = GoodPracticesGalleryImage
        fields = (
            'id',
            'image',
        )


class GoodPracticesWebSourceSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = GoodPracticesWebSource
        fields = (
            'id',
            'url',
        )


class GoodPracticesSerializerV1(serializers.ModelSerializer):

    program = ProgramSerializerV1(many=True)
    good_practices_gallery_images = GoodPracticesGalleryImageSerializerV1(many=True)
    web_sources = GoodPracticesWebSourceSerializerV1(many=True)

    class Meta:
        model = GoodPractices
        fields = (
            'id',
            'program',
            'title',
            'description',
            'portada',
            'good_practices_gallery_images',
            'web_sources'
        )