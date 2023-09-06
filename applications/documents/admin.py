from django.contrib import admin
from import_export.admin import ImportExportMixin
from import_export.resources import ModelResource

from .models import Documents, DocumentType

''' La clase Model Resource disponibiliza al Model indicado
    para poder usar el ImportExportMixin en el administrador
    de Django. Este método permite Importar/exportar bases de
    datos. Cuando hay claves foreignkey, éstas deben importarse
    primero para no crear error.
    Para instalar la aplicación usar pip install django-import-export
    o usar el requirements.txt, luego en settings.base instalar la app
    en la config THIRD_PARTY_APPS'''

class DocumentsResource(ModelResource):
    class Meta:
        model = Documents


class DocumentTypeResource(ModelResource):
    class Meta:
        model = DocumentType

# Modelos disponibles para editar en el admin
@admin.register(Documents)
class DocumentsAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = Documents
    list_display = ('id', 'title', 'public')
    search_fields = ('title',)
    list_display_links = ('title',)
    list_per_page = 20

    def make_public(self, request, queryset):
        queryset.update(public=True)

    def make_private(self, request, queryset):
        queryset.update(public=False)

    # Configurar metadatos para la acción personalizada
    make_public.short_description = "Marcar como público"
    make_private.short_description = "Marcar como privado"

    # Agregar las acciones personalizadas al administrador
    actions = [make_public, make_private]


@admin.register(DocumentType)
class TypeAdmin(ImportExportMixin, admin.ModelAdmin):
    resource_class = DocumentTypeResource