from django.contrib import admin
from import_export.admin import ImportExportMixin
from import_export.resources import ModelResource

from .models import InnovativeProjects, InnovativeGalleryImage, InnovativeWebSource, HistoricalInnovativeProjects, HistoricalInnovativeWebSource

''' La clase Model Resource disponibiliza al Model indicado
    para poder usar el ImportExportMixin en el administrador
    de Django. Este método permite Importar/exportar bases de
    datos. Cuando hay claves foreignkey, éstas deben importarse
    primero para no crear error.
    Para instalar la aplicación usar pip install django-import-export
    o usar el requirements.txt, luego en settings.base instalar la app
    en la config THIRD_PARTY_APPS'''


class InnovativeProjectsResource(ModelResource):
    class Meta:
        model = InnovativeProjects

# Modelos tipo inline
class InnovativeGalleryImage(admin.TabularInline):
    model = InnovativeGalleryImage

class InnovativeWebSource(admin.TabularInline):
    model = InnovativeWebSource


# Modelos disponibles para editar en el admin
@admin.register(InnovativeProjects)
class InnovativeProjectsAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = InnovativeProjectsResource
    list_display = ('id', 'title', 'program', 'public')
    search_fields = ('title', 'program')
    list_display_links = ('title',)
    list_per_page = 20
    inlines = [
        InnovativeGalleryImage,
        InnovativeWebSource,
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


class HistoricalInnovativeProjectsAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'public', 'history_type', 'history_date', 'history_user']
    search_fields = ['title']
    list_display_links = ['title']
    list_per_page = 20

# Registra el modelo histórico en el admin
admin.site.register(HistoricalInnovativeProjects, HistoricalInnovativeProjectsAdmin)

class HistoricalInnovativeWebSourceAdmin(admin.ModelAdmin):
    list_display = ['id', 'url', 'project', 'history_type', 'history_date', 'history_user']
    search_fields = ['url']
    list_display_links = ['url']
    list_per_page = 20

# Registra el modelo histórico en el admin
admin.site.register(HistoricalInnovativeWebSource, HistoricalInnovativeWebSourceAdmin)