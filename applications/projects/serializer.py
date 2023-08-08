from rest_framework import serializers
#
from .models import (
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


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = (
            'name',
        )


class YearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Year
        fields = (
            'number',
        )


class GuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guide
        fields = (
            'name',
            'guide'
        )


class TypeSerializer(serializers.ModelSerializer):

    guides = GuideSerializer(many=True)

    class Meta:
        model = Type
        fields = (
            'name',
            'guides'
        )


class TypeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = (
            'name',
        )


class PrioritizedTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrioritizedTag
        fields = (
            'prioritized_tag',
        )


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projectimage
        fields = ('image_carousel',)


class ProjectFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projectfile
        fields = (
            'name',
            'file'
        )


class ProjectListSerializer(serializers.ModelSerializer):

    program = ProgramSerializer()
    year = YearSerializer()
    type = TypeListSerializer()
    prioritized_tag = PrioritizedTagSerializer(many=True)
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


class ProjectDetailSerializer(serializers.ModelSerializer):

    program = ProgramSerializer()
    year = YearSerializer()
    type = TypeSerializer()
    prioritized_tag = PrioritizedTagSerializer(many=True)
    comuna = ComunaRegionSerializer()
    images = ProjectImageSerializer(many=True)
    files = ProjectFileSerializer(many=True)

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