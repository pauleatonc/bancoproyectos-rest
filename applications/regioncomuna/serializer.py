from rest_framework import serializers
#
from .models import (
    Region,
    Comuna
)


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = (
            'region',
        )


class ComunaSerializer(serializers.ModelSerializer):

    region = RegionSerializer()

    class Meta:
        model = Comuna
        fields = (
            'comuna',
            'region'
        )