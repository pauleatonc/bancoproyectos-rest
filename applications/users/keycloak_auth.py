from django.contrib.auth import get_user_model
from keycloak import KeycloakOpenID
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
import requests

def get_keycloak_config():
    return settings.KEYCLOAK_CONFIG
    
def exchange_code_for_token(code, code_verifier):
    # Obtener las configuraciones de Keycloak según el entorno
    keycloak_config = get_keycloak_config()
    print('1. Se ejecuta exchange_code_for_token')

    payload = {
        'grant_type': 'authorization_code',
        'client_id': keycloak_config['resource'],
        #'client_secret': keycloak_config['credentials']['secret'],
        'redirect_uri': keycloak_config['redirect_uri'],
        'code': code,       
        'code_verifier': code_verifier,
    }
    print("2. payload = ", payload)

    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    print("3. headers = ", headers)

    keycloak_token_url = keycloak_config['keycloak_token_url']
    print("4. keycloak_token_url = ", keycloak_token_url)

    response = requests.post(keycloak_token_url, data=payload, headers=headers)
    print("4. response = ", response)

    if response.status_code == 200:
        return response.json()  # Esto debería contener el token de acceso y otros tokens
    else:
        # Log para depuración
        print(f'Error intercambiando el código por token: {response.status_code}, {response.text}')
        try:
            error_details = response.json()
            print(f'Detalles del error: {error_details}')
        except Exception as e:
            print(f'No se pudo parsear la respuesta de error: {e}')
        return None


def verify_user(token):
    # Obtener las configuraciones de Keycloak según el entorno
    keycloak_config = get_keycloak_config()

    # Crear instancia de KeycloakOpenID sin client_secret
    keycloak_openid = KeycloakOpenID(server_url=keycloak_config['auth-server-url'],
                                     client_id=keycloak_config['resource'],
                                     realm_name=keycloak_config['realm'])
    
    # Obtener la clave pública del realm desde Keycloak
    # Esta es una operación que normalmente se hace una vez y se cachéa
    public_key = keycloak_openid.public_key()
    
    # Decodificar y verificar el token usando la clave pública
    # Nota: Este paso puede variar según la librería específica que estés usando
    # Si estás usando python-keycloak, podría ser necesario ajustar este paso
    token_info = keycloak_openid.decode_token(token, key=public_key)
    
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
