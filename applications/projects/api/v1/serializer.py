from rest_framework import serializers
#
from applications.projects.models import (
    Program,
    Guide,
    Type,
    Year,
    PrioritizedTag,
    Project,
    Projectimage,
    Projectfile    
)
#
from applications.regioncomuna.serializer import ComunaRegionSerializer


class ProgramSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = (
            'name',
            'sigla'
        )


class YearSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Year
        fields = (
            'number',
        )


class GuideSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Guide
        fields = (
            'name',
            'guide'
        )


class TypeSerializerV1(serializers.ModelSerializer):

    guides = GuideSerializerV1(many=True)

    class Meta:
        model = Type
        fields = (
            'name',
            'guides'
        )


class TypeListSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = (
            'name',
        )


class PrioritizedTagSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = PrioritizedTag
        fields = (
            'prioritized_tag',
        )


class ProjectImageSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Projectimage
        fields = ('image_carousel',)


class ProjectFileSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Projectfile
        fields = (
            'name',
            'file'
        )


class ProjectListSerializerV1(serializers.ModelSerializer):

    program = ProgramSerializerV1()
    year = YearSerializerV1()
    type = TypeListSerializerV1()
    prioritized_tag = PrioritizedTagSerializerV1(many=True)
    comuna = ComunaRegionSerializer()

    class Meta:
        model = Project
        fields = (
            'name',
            'id_subdere',
            'description',
            'year',
            'program',
            'type',
            'public',
            'portada',
            'presupuesto',
            'comuna',
            'slug',
            'prioritized_tag',
        )


class ProjectDetailSerializerV1(serializers.ModelSerializer):

    program = ProgramSerializerV1()
    year = YearSerializerV1()
    type = TypeSerializerV1()
    prioritized_tag = PrioritizedTagSerializerV1(many=True)
    comuna = ComunaRegionSerializer()
    images = ProjectImageSerializerV1(many=True)
    files = ProjectFileSerializerV1(many=True)

    class Meta:
        model = Project
        fields = (
            'name',
            'id_subdere',
            'description',
            'year',
            'program',
            'type',
            'public',
            'video',
            'portada',
            'beforeimage',
            'afterimage',
            'eett',
            'presupuesto',
            'comuna',
            'slug',
            'prioritized_tag',
            'images',
            'files'
        )