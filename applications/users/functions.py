#Funciones extra de la aplicación users

from django.core.exceptions import ValidationError

import random
import string

def code_generator(size=6, chars= string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for i in range(size))

# Validador personalizado para el RUT chileno
def validar_rut(value):
    rut = value.cleaned_data['rut'].replace('.', '').replace('-', '')
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
    return rut + dv