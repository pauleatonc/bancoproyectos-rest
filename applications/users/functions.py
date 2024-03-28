#Funciones extra de la aplicación users

from django.core.exceptions import ValidationError
import requests
from django.conf import settings

import random
import string

def code_generator(size=6, chars= string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for i in range(size))

# Validador para el Modelo User para el RUT chileno
def validar_rut(value):
    rut = value.replace(".", "").replace("-", "")  # Eliminar puntos y guiones
    if not rut[:-1].isdigit() or (rut[-1].lower() != 'k' and not rut[-1].isdigit()):
        raise ValidationError('El RUT debe contener sólo números o "k" como dígito verificador')
    if len(rut) < 7:
        raise ValidationError('El RUT debe contener al menos 7 dígitos')
    verificador = rut[-1].lower()  # Obtener dígito verificador
    rut = rut[:-1]  # Eliminar dígito verificador del RUT
    suma = 0
    multiplo = 2
    # Calcular suma ponderada de los números del RUT
    for i in reversed(range(len(rut))):
        suma += int(rut[i]) * multiplo
        multiplo = 2 if multiplo == 7 else multiplo + 1
    # Calcular dígito verificador esperado
    dv_esperado = str(11 - (suma % 11))
    if dv_esperado == '11':
        dv_esperado = '0'
    elif dv_esperado == '10':
        dv_esperado = 'k'
    # Comparar dígito verificador esperado con el ingresado
    if dv_esperado != verificador:
        raise ValidationError('El RUT ingresado no es válido')

    # Formatear RUT con guión y dígito verificador
    rut_formateado = rut + "-" + dv_esperado

    return rut_formateado

# Validador y formateador del rut para el Forms.py
def validar_rut_form(self):
    rut = self.cleaned_data['rut'].replace('.', '').replace('-', '')
    dv = rut[-1].lower()
    rut = rut[:-1]
    try:
        int(rut)
    except ValueError:
        raise ValidationError('El RUT debe ser un número sin puntos ni guion')
    if not rut:
        raise ValidationError('Debe ingresar un RUT')
    if not dv.isnumeric() and dv != 'k':
        raise ValidationError('El dígito verificador debe ser un número o "k"')
    if int(rut) < 1:
        raise ValidationError('El RUT debe ser un número positivo')
    if len(rut) < 7:
        raise ValidationError('El RUT debe tener al menos 7 dígitos')
    factor = 2
    total = 0
    for digit in reversed(rut):
        total += int(digit) * factor
        factor += 1
        if factor == 8:
            factor = 2
    dv_calculated = 11 - (total % 11)
    if dv_calculated == 11:
        dv_calculated = 0
    elif dv_calculated == 10:
        dv_calculated = 'k'
    if str(dv_calculated) != dv:
        raise ValidationError('El RUT no es válido')
    return rut + '-' + dv


def exchange_code_for_token(code):
    print('1. Se ejecuta exchange_code_for_token')
    # Reemplaza estos valores con tu configuración real de Keycloak
    client_id = 'localhost-backend'
    client_secret = 'yLAGL9hWC2jlggqemLoYGGNRL0pUkkPY'  # Omitir si tu cliente es público
    redirect_uri = 'http://localhost:5173/callback/'
    keycloak_token_url = 'https://oid.subdere.gob.cl/realms/app-qa/protocol/openid-connect/token'

    payload = {
        'client_id': client_id,
        'client_secret': client_secret,  # Omitir si tu cliente es público
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
    }

    print("2. payload = ", payload)
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    print("3. headers = ", headers)
    response = requests.post(keycloak_token_url, data=payload, headers=headers)

    print("4. response = ", response)
    if response.status_code == 200:
        return response.json()  # Esto debería contener el token de acceso y otros tokens
    else:
        # Log para depuración
        print(f'Error intercambiando el código por token: {response.status_code}, {response.text}')
        return None