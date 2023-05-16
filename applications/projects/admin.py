from django.contrib import admin
from .models import Project, Program, Type, Guide, Projectimage, Projectfile, Year
from import_export.admin import ExportMixin
from import_export.resources import ModelResource

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

class ProjectfileAdmin(admin.TabularInline):
    model = Projectfile

class ProjectimageAdmin(admin.TabularInline):
    model = Projectimage

@admin.register(Project)
class ProjectAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = ProjectResource
    list_display=('id_subdere', 'name', 'program', 'type',)
    search_fields=('name', 'id_subdere',)
    list_display_links=('name',)
    list_filter=('program', 'type',)
    list_per_page = 20
    inlines = [
        ProjectimageAdmin,
        ProjectfileAdmin,
    ]

@admin.register(Program)
class ProgramAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = ProgramResource
    search_fields=('name', 'sigla',)
    list_display=('sigla', 'name')
    ordering=('name',)
    list_per_page = 20

@admin.register(Type)
class TypeAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = TypeResource

@admin.register(Guide)
class GuideAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = GuideResource
    search_fields=('name',)
    list_per_page = 20

@admin.register(Year)
class YearAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = YearResource