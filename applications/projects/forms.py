from django import forms
from applications.regioncomuna.models import Region, Comuna

class ProjectFilterForm(forms.Form):
    name = forms.CharField()


class LocationForm(forms.Form):
    region = forms.ModelChoiceField(queryset=Region.objects.all(), empty_label='Region')
    comuna = forms.ModelChoiceField(queryset=Comuna.objects.all(), empty_label='Comuna')

