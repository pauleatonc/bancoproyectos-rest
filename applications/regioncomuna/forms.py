from django import forms
from .models import Region, Comuna


class LocacionForm(forms.Form):
    region = forms.ModelChoiceField(queryset=Region.objects.all(), empty_label='Selecciona una región')
    comuna = forms.ModelChoiceField(queryset=Comuna.objects.all(), empty_label='Selecciona una comuna')
