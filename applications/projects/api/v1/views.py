from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import permissions
#
from django.db.models import Count
from django.db.models import Q

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

    serializer_class = ProjectDetailSerializerV1
    lookup_field = 'slug'

    def get_queryset(self):
        ''' Listado de proyectos para filtrar '''
        queryset = Project.objects.all()

        region = self.request.query_params.get('region', None)
        comuna = self.request.query_params.get('comuna', None)
        year = self.request.query_params.get('year', None)
        program = self.request.query_params.get('program', None)
        type_ = self.request.query_params.get('type', None)

        if region:
            regions_list = region.split(',')
            queryset = queryset.filter(comuna__region__region__in=regions_list)
        if comuna:
            comunas_list = comuna.split(',')
            queryset = queryset.filter(comuna__comuna__in=comunas_list)
        if year:
            years_list = [int(y) for y in year.split(',')]
            queryset = queryset.filter(year__number__in=years_list)
        if program:
            programs_list = program.split(',')
            queryset = queryset.filter(program__name__in=programs_list)
        if type_:
            types_list = type_.split(',')
            queryset = queryset.filter(type__name__in=types_list)

        search = self.request.query_params.get('search', None)
        if search:
            # Aquí puedes ajustar los campos en los que quieres buscar.
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search)
            )

        return queryset

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