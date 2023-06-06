from django import forms
from .models import Contact

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ('full_name', 'email', 'organization', 'contact_reason', 'message')

        labels = {
            'full_name': 'Nombre completo (obligatorio)',
            'email': 'Correo electrónico institucional (obligatorio)',
            'organization': 'Organización a la que perteneces (obligatorio)',
            'contact_reason': 'Razón de contacto (obligatorio)',
            'message': 'Comentario (obligatorio)'
        }

        widgets = {
            'full_name': forms.TextInput(attrs={'required': True, 'placeholder': 'Ingresa tu nombre.', 'class': 'custom-input'}),
            'email': forms.EmailInput(attrs={'required': True, 'placeholder': 'Ingresa tu corre electrónico.', 'class': 'custom-input'}),
            'organization': forms.TextInput(attrs={'required': True, 'placeholder': 'Ingresa el nombre de tu organización.', 'class': 'custom-input'}),
            'contact_reason': forms.Select(attrs={'required': True, 'placeholder': 'Elige una opción', 'class': 'custom-select'}),
            'message': forms.Textarea(attrs={'required': True, 'maxlength': 250, 'placeholder': 'Describe la razón de contacto.', 'class': 'custom-textarea'}),
        }

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email and '@' not in email:
            raise forms.ValidationError('Por favor, introduce un correo electrónico válido.')
        return email
