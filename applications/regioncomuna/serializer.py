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


class RegionSerializer(serializers.ModelSerializer):
    comunas = ComunaSerializer(many=True)

    class Meta:
        model = Region
        fields = ('region', 'comunas')