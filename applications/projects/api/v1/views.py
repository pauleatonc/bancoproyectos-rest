from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import permissions
from rest_framework import filters
#
from django.db.models import Count
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.generics import (
    GenericAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView
)
#
from applications.projects.models import (
    Program,
    Guide,
    Type,
    Year,
    PrioritizedTag,
    Project,
)

from applications.regioncomuna.models import (
    Region,
    Comuna
)
#
from .projectSerializer import (
    ProjectDetailSerializerV1,
    YearSerializerV1,
    ProgramSerializerV1,
    TypeSerializerV1,
)

from applications.regioncomuna.serializer import (
    RegionWithComunasSerializer,
)


'''@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'projects': reverse('project-list', request=request, format=format),
    })'''


class ProjectViewSet(viewsets.ModelViewSet):

    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializerV1
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['comuna__region', 'comuna', 'year', 'program', 'type']
    search_fields = ['name', 'id_subdere']
    ordering_fields = ['year']
    ordering = ['year']


    @action(detail=False, methods=['GET'])
    def filter_options(self, request):
        # Obtener años únicos que están asociados con al menos un proyecto
        unique_years = Year.objects.annotate(num_projects=Count('project')).filter(num_projects__gt=0).order_by(
            'number')

        # Obtener programas únicos que están asociados con al menos un proyecto
        unique_programs = Program.objects.annotate(num_projects=Count('project')).filter(num_projects__gt=0).order_by(
            'name')

        # Obtener tipos únicos que están asociados con al menos un proyecto
        unique_types = Type.objects.annotate(num_projects=Count('project')).filter(num_projects__gt=0).order_by('name')

        # A partir de las comunas, obtener las regiones únicas
        unique_regiones = Region.objects.annotate(
            num_comunas_with_projects=Count('comunas__project', distinct=True)).filter(
            num_comunas_with_projects__gt=0).order_by('id')

        # Serializar los datos
        serializer_context = {'request': request}
        years_data = YearSerializerV1(unique_years, many=True, context=serializer_context).data
        programs_data = ProgramSerializerV1(unique_programs, many=True, context=serializer_context).data
        types_data = TypeSerializerV1(unique_types, many=True, context=serializer_context).data
        region_data = RegionWithComunasSerializer(unique_regiones, many=True, context=serializer_context).data

        return Response({
            'years': years_data,
            'programs': programs_data,
            'types': types_data,
            'regiones': region_data,
        })