from django.contrib import admin
from .models import Project, Program, Type, Guide, Projectimage, Projectfile, Year

class ProjectfileAdmin(admin.TabularInline):
    model = Projectfile

class ProjectimageAdmin(admin.TabularInline):
    model = Projectimage

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
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
class ProjectAdmin(admin.ModelAdmin):
    search_fields=('name', 'sigla',)
    list_display=('sigla', 'name')
    ordering=('name',)
    list_per_page = 20


@admin.register(Guide)
class ProjectAdmin(admin.ModelAdmin):
    search_fields=('name',)
    list_per_page = 20

admin.site.register(Type)
admin.site.register(Year)
