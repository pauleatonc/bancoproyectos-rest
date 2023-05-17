from django import forms
from django.contrib import admin
from .models import Project, Program, Type, Guide, Projectimage, Projectfile, Year
from import_export.admin import ImportExportMixin
from import_export.resources import ModelResource

''' La clase Model Resource disponibiliza al Model indicado
    para poder usar el ImportExportMixin en el administrador
    de Django. Este método permite Importar/exportar bases de
    datos. Cuando hay claves foreignkey, éstas deben importarse
    primero para no crear error'''

class ProjectResource(ModelResource):
    class Meta:
        model = Project

class ProgramResource(ModelResource):
    class Meta:
        model = Program

class TypeResource(ModelResource):
    class Meta:
        model = Type

class GuideResource(ModelResource):
    class Meta:
        model = Guide

class YearResource(ModelResource):
    class Meta:
        model = Year
from applications.regioncomuna.models import Comuna


class ProjectAdminForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['comuna'].queryset = Comuna.objects.none()

        if 'region' in self.data:
            try:
                region_id = int(self.data.get('region'))
                self.fields['comuna'].queryset = Comuna.objects.filter(region_id=region_id)
            except (ValueError, TypeError):
                pass
        elif self.instance and self.instance.region:
            self.fields['comuna'].queryset = Comuna.objects.filter(region=self.instance.region)


class ProjectfileAdmin(admin.TabularInline):
    model = Projectfile


class ProjectimageAdmin(admin.TabularInline):
    model = Projectimage


@admin.register(Project)
class ProjectAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = ProjectResource
    list_display=('id_subdere', 'name', 'program', 'type',)
    search_fields=('name', 'id_subdere',)
    list_display_links=('name',)
    list_filter=('program', 'type',)
    
class CustomProjectAdmin(admin.ModelAdmin):
    list_display = ('id_subdere', 'name', 'program', 'type',)
    list_display_links = ('name',)
    list_filter = ('program', 'type',)
    list_per_page = 20
    search_fields = ('name', 'id_subdere',)
    inlines = [
        ProjectimageAdmin,
        ProjectfileAdmin,
    ]
    form = ProjectAdminForm

    class Media:
        js = ('./admin_project_form.js',)


@admin.register(Program)
class ProgramAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = ProgramResource
    search_fields=('name', 'sigla',)
    list_display=('sigla', 'name')
    ordering=('name',)
    list_per_page = 20

@admin.register(Type)
class TypeAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = TypeResource

@admin.register(Guide)
class GuideAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = GuideResource
    search_fields=('name',)
    list_per_page = 20

@admin.register(Year)
class YearAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = YearResource
