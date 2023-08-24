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
            'id',
            'name',
            'sigla',
            'icon_program'
        )


class YearSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Year
        fields = (
            'id',
            'number',
        )


class GuideSerializerV1(serializers.ModelSerializer):
    guide_format = serializers.SerializerMethodField()

    class Meta:
        model = Guide
        fields = (
            'id',
            'name',
            'guide',
            'guide_format'
        )

    def get_guide_format(self, obj):
        # Retorna la extensión del archivo sin el punto
        return obj.guide.name.split('.')[-1].upper()


class TypeSerializerV1(serializers.ModelSerializer):

    guides = GuideSerializerV1(many=True)

    class Meta:
        model = Type
        fields = (
            'id',
            'name',
            'guides'
        )


class PrioritizedTagSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = PrioritizedTag
        fields = (
            'id',
            'prioritized_tag',
        )


class ProjectImageSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Projectimage
        fields = (
            'id',
            'image_carousel',
        )


class ProjectFileSerializerV1(serializers.ModelSerializer):
    file_format = serializers.SerializerMethodField()
    class Meta:
        model = Projectfile
        fields = (
            'id',
            'name',
            'file',
            'file_format'
        )

    def get_file_format(self, obj):
        # Retorna la extensión del archivo sin el punto
        return obj.file.name.split('.')[-1].upper()


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
            'id',
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