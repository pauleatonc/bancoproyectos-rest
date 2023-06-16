from django import forms
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError

from .models import User

from .functions import validar_rut_form


class UserRegisterForm(forms.ModelForm):

    password1 = forms.CharField(
        label='Escribe una contraseña',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': '********',
                'class': 'custom-input'
            }
        )
    )

    password2 = forms.CharField(
        label='Confirma la contraseña escrita anteriormente',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': '********',
                'class': 'custom-input'

            }
        )
    )

    class Meta:
        """Meta definition for UserRegisterform."""

        model = User
        fields = (
            'rut',
            'nombres',
            'primer_apellido',
            'segundo_apellido',
            'email',
        )

        labels = {
            'rut': 'RUT (Obligatorio)',
            'nombres': 'Nombre',
            'primer_apellido': 'Primer apellido',
            'segundo_apellido': 'Segundo apellido',
            'email': 'Correo electrónico institucional (obligatorio)',
        }

        widgets = {
            'rut': forms.TextInput(
                attrs={
                    'required': True,
                    'placeholder': 'Escribe tu RUT sin puntos ni guiones y con dígito verificador',
                    'class': 'custom-input'
                }
            ),
            'nombres': forms.TextInput(
                attrs={
                    'required': True,
                    'placeholder': 'Ingresa tu nombre.',
                    'class': 'custom-input'
                }
            ),
            'primer_apellido': forms.TextInput(
                attrs={
                    'required': True,
                    'placeholder': 'Ingresa tu primer apellido.',
                    'class': 'custom-input'
                }
            ),
            'segundo_apellido': forms.TextInput(
                attrs={
                    'required': True,
                    'placeholder': 'Ingresa tu segundo apellido.',
                    'class': 'custom-input'
                }
            ),
            'email': forms.EmailInput(
                attrs={
                    'required': True,
                    'placeholder': 'Ingresa tu correo electrónico.',
                    'class': 'custom-input'
                }
            ),
        }

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError('Las contraseñas no coinciden')
        return password2

    def clean_rut(self):
        rut = self.cleaned_data['rut']
        rut = rut.replace('-', '').replace('.', '').replace(',', '')  # Limpiar rut ingresado
        rut = f'{rut[:-1]}-{rut[-1]}'  # Insertar guion antes del último dígito
        return rut


class LoginForm(forms.Form):
    rut = forms.CharField(
        label='Rut',
        required=True,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Ingresa tu RUT',
                'class': 'custom-input'
            }
        )
    )

    password = forms.CharField(
        label='Contraseña',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': 'Ingresa tu contraseña',
                'class': 'custom-input'
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
