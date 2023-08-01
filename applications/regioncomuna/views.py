from .models import Region, Comuna
#
from rest_framework.generics import ListAPIView
#
from .serializer import ComunaSerializer


class RegionComunaView(ListAPIView):

    serializer_class = ComunaSerializer

    def get_queryset(self):
        return Comuna.objects.all()
