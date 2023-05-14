#Funciones extra de la aplicación users

from django.core.exceptions import ValidationError

# Validador personalizado para el RUT chileno
def validar_rut(value):
    rut = value
    if not rut.isdigit():
        raise ValidationError('El RUT debe contener sólo números')
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