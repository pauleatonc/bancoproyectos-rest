from rest_framework.response import Response
from django.db.models import Count

from rest_framework.generics import (
    GenericAPIView,
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    DestroyAPIView,
    UpdateAPIView,
    RetrieveUpdateAPIView
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
#
from .projectListSerializer import (
    ProjectListSerializerV1,
    YearSerializerV1,
    ProgramSerializerV1,
    TypeListSerializerV1,
)

from .projectDetailSerializer import (
    ProjectDetailSerializerV1,
)


class ProjectListApiViewV1(ListAPIView):

    serializer_class = ProjectListSerializerV1

    def get_queryset(self):
        return Project.objects.all()


class ProjectDetailApiViewV1(RetrieveAPIView):

    serializer_class = ProjectDetailSerializerV1
    lookup_field = 'slug'

    def get_queryset(self):
        return Project.objects.all()


class FilterOptionsAPIViewV1(GenericAPIView):
    def get(self, request):
        # Obtener años únicos que están asociados con al menos un proyecto
        unique_years = Year.objects.annotate(num_projects=Count('project_set')).filter(num_projects__gt=0).order_by('number')

        # Obtener programas únicos que están asociados con al menos un proyecto
        unique_programs = Program.objects.annotate(num_projects=Count('project_set')).filter(num_projects__gt=0).order_by('name')

        # Obtener tipos únicos que están asociados con al menos un proyecto
        unique_types = Type.objects.annotate(num_projects=Count('project_set')).filter(num_projects__gt=0).order_by('name')

        # Serializar los datos
        years_data = YearSerializerV1(unique_years, many=True).data
        programs_data = ProgramSerializerV1(unique_programs, many=True).data
        types_data = TypeListSerializerV1(unique_types, many=True).data

        return Response({
            'years': years_data,
            'programs': programs_data,
            'types': types_data,
        })