from rest_framework import serializers
#
from applications.innovative_projects.models import (
    InnovativeProjects,
    InnovativeGalleryImage,
    InnovativeWebSource,
    RevisionSectionOne,
    RevisionSectionTwo
)

from applications.projects.models import Program


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = (
            'sigla',
        )

class InnovativeGalleryImageSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = InnovativeGalleryImage
        fields = (
            'id',
            'image',
        )


class InnovativeWebSourceSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = InnovativeWebSource
        fields = (
            'id',
            'url',
        )


class InnovativeProjectsSerializerV1(serializers.ModelSerializer):

    program = ProgramSerializer(many=True)
    innovative_gallery_images = InnovativeGalleryImageSerializerV1(many=True)
    web_sources = InnovativeWebSourceSerializerV1(many=True)

    class Meta:
        model = InnovativeProjects
        fields = (
            'id',
            'program',
            'title',
            'description',
            'portada',
            'innovative_gallery_images',
            'web_sources'
        )


from rest_framework import serializers


class InnovativeProjectsAdminListSerializer(serializers.ModelSerializer):
    program = ProgramSerializer(many=True)
    application_status = serializers.SerializerMethodField()
    author_email = serializers.SerializerMethodField()  # Field for the author's email

    class Meta:
        model = InnovativeProjects
        fields = (
            'id',
            'program',
            'title',
            'application_status',
            'author_email'  # Include author_email in the fields
        )

    def get_application_status(self, obj):
        return obj.application_status

    def get_author_email(self, obj):  # Method to get the author's email
        # Access the historical records and get the earliest one
        historical_record = obj.historical_date.earliest('history_date')

        if historical_record.history_user:  # Check if history_user is not None
            return historical_record.history_user.email
        else:
            return None  # or return a default value like 'N/A' or an empty string


class RevisionSectionOneSerializer(serializers.ModelSerializer):
    class Meta:
        model = RevisionSectionOne
        fields = (
            'approved_title',
            'approved_description',
            'approved_program',
            'approved_section_one'
        )


class RevisionSectionTwoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RevisionSectionTwo
        fields = (
            'approved_portada',
            'approved_gallery',
            'approved_web_source',
            'approved_section_two'
        )


class InnovativeProjectsCreateSerializer(serializers.ModelSerializer):
    program = ProgramSerializer(many=True)
    innovative_gallery_images = InnovativeGalleryImageSerializerV1(many=True)
    web_sources = InnovativeWebSourceSerializerV1(many=True)
    revision_section_one = RevisionSectionOneSerializer(required=False)
    revision_section_two = RevisionSectionTwoSerializer(required=False)


    class Meta:
        model = InnovativeProjects
        fields = ['title',
                  'description',
                  'portada',
                  'program',
                  'web_sources',
                  'innovative_gallery_images',
                  'public',
                  'revision_section_one',
                  'revision_section_two',
                  'evaluated',
                  'request_sent'
                  ]

    def validate(self, data):
        request = self.context.get('request')
        user = request.user

        is_editor_or_superuser = user.groups.filter(name='Editor').exists() or user.is_superuser
        is_profesional = user.groups.filter(name='Profesional').exists()

        # Si el usuario es del grupo "Profesional", 'public' siempre será False
        if is_profesional:
            data['public'] = False

        # Si el usuario no es superusuario, no es del grupo "Editor", y no es del grupo "Profesional", entonces no puede crear proyectos.
        elif not (is_editor_or_superuser or is_profesional):
            raise serializers.ValidationError("No tienes permiso para crear proyectos.")

        return data

    def create(self, validated_data):
        # Extrae los campos relacionados
        gallery_images_data = validated_data.pop('innovative_gallery_images', [])

        request = self.context.get('request')
        user = request.user

        is_editor_or_superuser = user.groups.filter(name='Editor').exists() or user.is_superuser

        # Si el usuario es superusuario o del grupo Editor, usa estos datos:
        if is_editor_or_superuser:
            revision_section_one_data = {
                'approved_title': True,
                'approved_description': True,
                'approved_program': True,
                'approved_section_one': True
            }

            revision_section_two_data = {
                'approved_portada': True,
                'approved_gallery': True,
                'approved_web_source': True,
                'approved_section_two': True
            }
            validated_data['evaluated'] = True

        else:  # Si no es, usa los valores por defecto del modelo
            revision_section_one_data = {
                'approved_title': RevisionSectionOne._meta.get_field('approved_title').default,
                'approved_description': RevisionSectionOne._meta.get_field('approved_description').default,
                'approved_program': RevisionSectionOne._meta.get_field('approved_program').default,
                'approved_section_one': RevisionSectionOne._meta.get_field('approved_section_one').default,
            }

            revision_section_two_data = {
                'approved_portada': RevisionSectionTwo._meta.get_field('approved_portada').default,
                'approved_gallery': RevisionSectionTwo._meta.get_field('approved_gallery').default,
                'approved_web_source': RevisionSectionTwo._meta.get_field('approved_web_source').default,
                'approved_section_two': RevisionSectionTwo._meta.get_field('approved_section_two').default,
            }
            validated_data['request_sent'] = True

        # Primero crea el proyecto
        project = InnovativeProjects.objects.create(**validated_data)

        # Asigna los campos relacionados
        for gallery_image_data in gallery_images_data:
            InnovativeGalleryImage.objects.create(project=project, **gallery_image_data)

        # Ahora crea las instancias de RevisionSectionOne y RevisionSectionTwo
        revision_section_one = RevisionSectionOne.objects.create(project=project, **revision_section_one_data)
        revision_section_two = RevisionSectionTwo.objects.create(project=project, **revision_section_two_data)

        # Asocia las instancias de RevisionSectionOne y RevisionSectionTwo con el proyecto
        project.revision_section_one = revision_section_one
        project.revision_section_two = revision_section_two
        project.save()

        return project