from rest_framework import serializers
#
from applications.projects.models import (
    Program,
    Guide,
    Type,
    Year,
    PrioritizedTag,
    Project,
)
#
from applications.regioncomuna.serializer import ComunaRegionSerializer


class ProgramSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = (
            'id',
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


class TypeListSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = (
            'name',
            'icon_type'
        )


class PrioritizedTagSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = PrioritizedTag
        fields = (
            'prioritized_tag',
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
            'id',
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