from django.contrib.auth import get_user_model
from keycloak import KeycloakOpenID
from django.core.exceptions import ObjectDoesNotExist
from projectbank.settings.local import KEYCLOAK_CONFIG

def verify_user(token):
    keycloak_openid = KeycloakOpenID(server_url=KEYCLOAK_CONFIG['auth-server-url'],
                                      client_id=KEYCLOAK_CONFIG['resource'],
                                      realm_name=KEYCLOAK_CONFIG['realm'],
                                      client_secret_key=KEYCLOAK_CONFIG['credentials']['secret'])
    
    # Decodificar el token para obtener la información del usuario
    token_info = keycloak_openid.decode_token(token, key=KEYCLOAK_CONFIG['credentials']['secret'])
    
    # Extraer el RUT y el DV del token
    rut_base = token_info['preferred_username']
    rut_dv = token_info['rut_dv']  # Asumiendo que 'rut_dv' es el nombre del atributo en Keycloak
    
    # Combinar el RUT y el DV en el formato requerido por tu modelo
    rut_formatted = f"{rut_base}-{rut_dv}"

    User = get_user_model()
    try:
        # Intentar obtener el usuario utilizando el RUT formateado
        user = User.objects.get(username=rut_formatted)
        return user
    except ObjectDoesNotExist:
        # Si el usuario no existe, puedes manejar esto como prefieras
        # Por ejemplo, podrías lanzar una excepción, devolver None, o devolver un mensaje de error
        return None
