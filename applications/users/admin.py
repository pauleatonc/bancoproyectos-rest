from django.contrib import admin

from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'rut', 'nombres', 'get_groups', 'program', 'is_active') # Campos que quieres mostrar en la vista de lista
    list_filter = ('is_active',) # Para filtrar por estado activo o inactivo
    search_fields = ('rut', 'nombres', 'primer_apellido', 'segundo_apellido', 'email') # Campos por los que puedes buscar

    def get_groups(self, obj):
        return ", ".join([g.name for g in obj.groups.all()])
    get_groups.short_description = 'Grupos'