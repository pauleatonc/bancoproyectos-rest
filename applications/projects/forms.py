from django import forms
from .models import Program, Type, Year
from applications.regioncomuna.models import Region, Comuna


class ProjectFilterForm(forms.Form):
        program = forms.ModelChoiceField(
                queryset=Program.objects.all(), required=False)
        type = forms.ModelChoiceField(
                queryset=Type.objects.all(), required=False)
        year = forms.ModelChoiceField(queryset=Year.objects.all(), required=False)
        region = forms.ModelChoiceField(
                queryset=Region.objects.all(), required=False)
        comuna = forms.ModelChoiceField(
                queryset=Comuna.objects.all(), required=False)
        search = forms.CharField(required=False)
        show_all = forms.BooleanField(required=False)


class LocationForm(forms.Form):
        region = forms.ModelChoiceField(
                queryset=Region.objects.all(), empty_label='Region')
        comuna = forms.ModelChoiceField(
                queryset=Comuna.objects.all(), empty_label='Comuna')
