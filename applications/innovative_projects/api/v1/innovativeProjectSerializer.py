from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
#
from applications.innovative_projects.models import (
    InnovativeProjects,
    InnovativeGalleryImage,
    InnovativeWebSource,
    RevisionSectionOne,
    RevisionSectionTwo,
    HistoricalInnovativeProjects,
    HistoricalInnovativeWebSource,
    HistoricalInnovativeGalleryImage
)

from simple_history.models import HistoricalRecords

from applications.projects.models import Program
from applications.users.permissions import is_editor_general_or_superuser, is_any_editor_or_superuser, is_profesional, is_admin


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

    program = ProgramSerializer()
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


class InnovativeProjectsAdminListSerializer(serializers.ModelSerializer):
    program = ProgramSerializer()
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

    def get_author_email(self, obj):
        if obj.historical_date.exists():
            historical_record = obj.historical_date.earliest('history_date')
            if historical_record.history_user:
                return historical_record.history_user.email
        return None  # o cualquier valor por defecto


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
    program = serializers.PrimaryKeyRelatedField(queryset=Program.objects.all(), required=False)
    revision_section_one = RevisionSectionOneSerializer(required=False)
    revision_section_two = RevisionSectionTwoSerializer(required=False)

    class Meta:
        model = InnovativeProjects
        fields = ['id', 'title', 'program', 'revision_section_one', 'revision_section_two',]

    def validate(self, data):
        request = self.context.get('request')
        user = request.user

        # Solo administradores pueden crear proyectos
        if not is_admin(user):
            raise serializers.ValidationError("No tienes permiso para crear proyectos.")

        return data

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user

        # Lógica para determinar los valores aprobados
        if is_any_editor_or_superuser(user):
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

        else:
            # Usa los valores por defecto del modelo si no es superusuario o editor
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

        # Crear la instancia del proyecto principal
        instance = InnovativeProjects.objects.create(**validated_data)

        # Crear instancias para RevisionSectionOne y RevisionSectionTwo asociadas al proyecto principal
        RevisionSectionOne.objects.create(project=instance, **revision_section_one_data)
        RevisionSectionTwo.objects.create(project=instance, **revision_section_two_data)

        return instance


class InnovativeProjectsUpdateSerializer(serializers.ModelSerializer):
    program = serializers.CharField(required=False)
    innovative_gallery_images = InnovativeGalleryImageSerializerV1(many=True, required=False)
    web_sources = InnovativeWebSourceSerializerV1(many=True, required=False)
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

    def __init__(self, *args, **kwargs):
        super(InnovativeProjectsUpdateSerializer, self).__init__(*args, **kwargs)

        request = self.context.get('request')
        user = request.user

        if not is_editor_general_or_superuser(user):
            self.fields['program'].read_only = True

    def validate(self, data):
        request = self.context.get('request')
        user = request.user

        # Si el usuario es de algún grupo "Profesional", 'public' siempre será False
        if is_profesional(user):
            data['public'] = False

        # Solo administradores pueden crear proyectos
        elif not is_admin(user):
            raise serializers.ValidationError("No tienes permiso para crear proyectos.")

        return data

    def update(self, instance, validated_data):
        request = self.context.get('request')
        user = request.user

        # Lógica para determinar los valores aprobados
        if is_any_editor_or_superuser(user):
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

        else:
            # Usa los valores por defecto del modelo si no es superusuario o editor
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

        # Para revision_section_one
        try:
            for field, value in revision_section_one_data.items():
                setattr(instance.revision_section_one, field, value)
            instance.revision_section_one.save()
        except ObjectDoesNotExist:
            # Crea el objeto si no existe
            RevisionSectionOne.objects.create(project=instance, **revision_section_one_data)

        for field, value in revision_section_one_data.items():
            setattr(instance.revision_section_one, field, value)
        instance.revision_section_one.save()

        # Para revision_section_two
        try:
            for field, value in revision_section_two_data.items():
                setattr(instance.revision_section_two, field, value)
            instance.revision_section_two.save()
        except ObjectDoesNotExist:
            # Crea el objeto si no existe
            RevisionSectionTwo.objects.create(project=instance, **revision_section_two_data)

        for field, value in revision_section_two_data.items():
            setattr(instance.revision_section_two, field, value)
        instance.revision_section_two.save()

        # Actualiza los campos foráneos del modelo
        program_name = validated_data.get('program')
        if program_name:
            program_instance = Program.objects.get(name=program_name)
            instance.program = program_instance

        # Para web_sources
        existing_web_source_ids = set(ws.id for ws in instance.web_sources.all())
        web_sources_data = validated_data.pop('web_sources', [])

        for web_source_data in web_sources_data:
            web_source_id = web_source_data.get('id', None)
            if web_source_id and web_source_id in existing_web_source_ids:
                existing_web_source_ids.remove(web_source_id)
            InnovativeWebSource.objects.update_or_create(
                id=web_source_id,
                project=instance,
                defaults=web_source_data
            )

        # Elimina las web_sources que ya no están asociadas con el proyecto
        InnovativeWebSource.objects.filter(id__in=existing_web_source_ids).delete()

        # Similarmente para innovative_gallery_images
        existing_gallery_ids = set(img.id for img in instance.innovative_gallery_images.all())
        gallery_images_data = validated_data.pop('innovative_gallery_images', [])

        for gallery_image_data in gallery_images_data:
            gallery_id = gallery_image_data.get('id', None)
            if gallery_id and gallery_id in existing_gallery_ids:
                existing_gallery_ids.remove(gallery_id)
            InnovativeGalleryImage.objects.update_or_create(
                id=gallery_id,
                project=instance,
                defaults=gallery_image_data
            )

        # Elimina las imágenes que ya no están asociadas con el proyecto
        InnovativeGalleryImage.objects.filter(id__in=existing_gallery_ids).delete()

        # Aquí está la lógica para actualizar los otros campos del modelo
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.portada = validated_data.get('portada', instance.portada)
        instance.request_sent = validated_data.get('request_sent', instance.request_sent)

        print("Before save:", instance.request_sent)
        instance.save()
        print("After save:", instance.request_sent)

        return instance


class InnovativeProjectsRetrieveSerializer(serializers.ModelSerializer):
    program = ProgramSerializer()
    innovative_gallery_images = InnovativeGalleryImageSerializerV1(many=True)
    web_sources = InnovativeWebSourceSerializerV1(many=True)
    application_status = serializers.SerializerMethodField()
    revision_section_one = RevisionSectionOneSerializer()
    revision_section_two = RevisionSectionTwoSerializer()

    class Meta:
        model = InnovativeProjects
        fields = (
            'id',
            'title',
            'description',
            'portada',
            'program',
            'web_sources',
            'innovative_gallery_images',
            'public',
            'application_status',
            'revision_section_one',
            'revision_section_two'
        )

    def get_application_status(self, obj):
        return obj.application_status


class ProjectEvaluationSerializer(serializers.ModelSerializer):
    revision_section_one = RevisionSectionOneSerializer()
    revision_section_two = RevisionSectionTwoSerializer()

    class Meta:
        model = InnovativeProjects
        fields = ['revision_section_one', 'revision_section_two']


from simple_history.models import HistoricalRecords
from rest_framework import serializers

class BaseHistorySerializer(serializers.ModelSerializer):
    modified_by = serializers.SerializerMethodField()
    changed_fields = serializers.SerializerMethodField()

    def get_modified_by(self, obj):
        return obj.history_user.email if obj.history_user else None

    def get_changed_fields(self, obj):
        if obj.prev_record:
            delta = obj.diff_against(obj.prev_record)
            changes = []
            for change in delta.changes:
                changes.append({
                    'field': change.field,
                    'old': change.old,
                    'new': change.new
                })
            return changes
        else:
            return []


class InnovativeProjectsHistorySerializer(BaseHistorySerializer):
    class Meta:
        model = HistoricalInnovativeProjects
        fields = ['history_date', 'modified_by', 'changed_fields']


class InnovativeWebSourceHistorySerializer(BaseHistorySerializer):
    class Meta:
        model = HistoricalInnovativeWebSource
        fields = ['history_date', 'modified_by', 'changed_fields']


class InnovativeGalleryImageHistorySerializer(BaseHistorySerializer):
    class Meta:
        model = HistoricalInnovativeGalleryImage
        fields = ['history_date', 'modified_by', 'changed_fields']