from rest_framework import serializers
#
from .models import (
    Region,
    Comuna
)


class ComunaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comuna
        fields = ('comuna',)


class ComunaRegionSerializer(serializers.ModelSerializer):
    region = serializers.CharField(source='region.region')

    class Meta:
        model = Comuna
        fields = ('comuna', 'region')


class RegionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Region
        fields = ('region',)