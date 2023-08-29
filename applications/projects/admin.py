from django import forms
from django.contrib import admin
from .models import Project, Program, Type, Guide, Projectimage, Projectfile, Year, PrioritizedTag, ChecklistDocuments
from import_export.admin import ImportExportMixin
from import_export.resources import ModelResource

''' La clase Model Resource disponibiliza al Model indicado
    para poder usar el ImportExportMixin en el administrador
    de Django. Este método permite Importar/exportar bases de
    datos. Cuando hay claves foreignkey, éstas deben importarse
    primero para no crear error.
    Para instalar la aplicación usar pip install django-import-export
    o usar el requirements.txt, luego en settings.base instalar la app
    en la config THIRD_PARTY_APPS'''

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

class PrioritizedTagResource(ModelResource):
    class Meta:
        model = PrioritizedTag

class ChecklistDocumentsResource(ModelResource):
    class Meta:
        model = ChecklistDocuments

# Modelos tipo inline
class ProjectfileAdmin(admin.TabularInline):
    model = Projectfile

class ProjectimageAdmin(admin.TabularInline):
    model = Projectimage

# Modelos disponibles para editar en el admin

@admin.register(Project)
class ProjectAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = ProjectResource
    list_display = ('id_subdere', 'name', 'program', 'type', 'public')
    search_fields = ('name', 'id_subdere', 'comuna')
    list_display_links = ('name',)
    list_filter = ('program', 'type', 'prioritized_tag')
    list_per_page = 20
    inlines = [
        ProjectimageAdmin,
        ProjectfileAdmin,
    ]

    # Definir una acción personalizada para editar el campo 'public'
    def make_public(self, request, queryset):
        queryset.update(public=True)

    def make_private(self, request, queryset):
        queryset.update(public=False)

    # Configurar metadatos para la acción personalizada
    make_public.short_description = "Marcar como público"
    make_private.short_description = "Marcar como privado"

    # Agregar las acciones personalizadas al administrador
    actions = [make_public, make_private]

@admin.register(Program)
class ProgramAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = ProgramResource
    search_fields = ('name', 'sigla')
    list_display = ('sigla', 'name')
    ordering = ('name',)
    list_per_page = 20

@admin.register(Type)
class TypeAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = TypeResource

@admin.register(Guide)
class GuideAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = GuideResource
    search_fields = ('name',)
    list_per_page = 20

@admin.register(Year)
class YearAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = YearResource

@admin.register(PrioritizedTag)
class PrioritizedTagAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = PrioritizedTagResource

@admin.register(ChecklistDocuments)
class ChecklistDocumentsAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = ChecklistDocumentsResource
