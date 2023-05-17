from django import forms
from django.contrib import admin
from .models import Project, Program, Type, Guide, Projectimage, Projectfile, Year
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
class ProgramAdmin(admin.ModelAdmin):
    search_fields = ('name', 'sigla',)
    list_display = ('sigla', 'name')
    ordering = ('name',)
    list_per_page = 20


@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_per_page = 20


admin.site.register(Type)
admin.site.register(Year)
