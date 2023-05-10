from django import forms

class ProjectFilterForm(forms.Form):
    name = forms.CharField()
    