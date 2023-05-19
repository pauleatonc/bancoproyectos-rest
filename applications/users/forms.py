from django import forms
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError

from .models import User

from .functions import validar_rut_form


class UserRegisterForm(forms.ModelForm):

    password1 = forms.CharField(
        label='Contraseña',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Contraseña'
            }
        )
    )

    password2 = forms.CharField(
        label='Repetir Contraseña',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Repetir contraseña'
            }
        )
    )

    class Meta:
        """Meta definition for UserRegisterform."""

        model = User
        fields = (
            'rut',
            'email',
            'username',
            'is_staff'
        )
        widgets = {
            'rut': forms.TextInput(
                attrs={
                'placeholder': 'Rut...',
                }
            ),
            'email': forms.EmailInput(
                attrs={
                    'placeholder': 'Correo electrónico...',
                }
            ),
            'username': forms.TextInput(
                attrs={
                'placeholder': 'Nombre de usuario'
                }
            ),
        }

    def clean_password2(self):
        if self.cleaned_data['password1'] != self.cleaned_data['password2']:
            self.add_error('password2', 'Las contraseñas no son iguales')

class LoginForm(forms.Form):
    rut = forms.CharField(
        label='Rut',
        required=True,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Ingrese su rut sin puntos ni guión'
            }
        )
    )

    password = forms.CharField(
        label='Contraseña',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Contraseña'
            }
        )
    )

    def clean_rut(self):
        """
        Realiza la validación y el formateo del campo Rut
        """
        rut = validar_rut_form(self)
        return rut

    def clean(self):
        """
        Realiza la validación y la autenticación del formulario en su conjunto
        """
        cleaned_data = super().clean()
        rut = cleaned_data.get('rut')
        password = cleaned_data.get('password')
        if rut and password:
            user = authenticate(username=rut, password=password)
            if user is None:
                self.add_error('password', 'Usuario y/o contraseña incorrectos')
        return cleaned_data

class UpdatePasswordForm(forms.Form):

    password1 = forms.CharField(
        label='Contraseña',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Contraseña Actual'
            }
        )
    )

    password2 = forms.CharField(
        label='Contraseña',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Contraseña Nueva'
            }
        )
    )

    password3 = forms.CharField(
        label='Contraseña',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Repetir Contraseña Nueva'
            }
        )
    )

    def clean_password3(self):
        if self.cleaned_data['password2'] != self.cleaned_data['password3']:
            self.add_error('password3', 'Las contraseñas no son iguales')


class VerificationSignInForm(forms.Form):
    codregistro = forms.CharField(required=True)


    def __init__(self, pk, *args, **kwargs):
        self.id_user = pk
        super(VerificationSignInForm, self).__init__(*args, **kwargs)

    def clean_codregistro(self):
        codigo = self.cleaned_data['codregistro']

        if len(codigo) == 6:
            # verificamos si el codigo y el id de usuario son validos:
            activo = User.objects.cod_validation(
                self.id_user,
                codigo
            )
            if not activo:
                raise forms.ValidationError('el codigo es incorrecto')
        else:
            raise forms.ValidationError('el codigo es incorrecto')