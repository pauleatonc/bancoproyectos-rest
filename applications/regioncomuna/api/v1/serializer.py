from rest_framework import serializers
#
from ...models import (
    Region,
    Comuna
)
#
from applications.projects.models import Project


class ComunaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comuna
        fields = (
            'id',
            'comuna',
        )


class ComunaRegionSerializer(serializers.ModelSerializer):
    region = serializers.CharField(source='region.region')

    class Meta:
        model = Comuna
        fields = ('comuna', 'region')


class RegionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Region
        fields = (
            'id',
            'region',
        )

class RegionWithComunasSerializer(serializers.ModelSerializer):
    comunas = serializers.SerializerMethodField()

    class Meta:
        model = Region
        fields = ('id', 'region', 'comunas')

    def get_comunas(self, obj):
        # Filtra las comunas que tienen proyectos
        comunas_with_projects = Comuna.objects.filter(region=obj, project__isnull=False).distinct()
        return ComunaSerializer(comunas_with_projects, many=True).data