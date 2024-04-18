from datetime import datetime
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .keycloak_auth import exchange_code_for_token, verify_user
from django.conf import settings
import requests

def get_keycloak_config():
    return settings.KEYCLOAK_CONFIG

#keycloak configuration
@api_view(['POST'])
@permission_classes([AllowAny])
def keycloak_code_exchange_view(request):
    data = request.data
    code = data.get('code')
    code_verifier = data.get('codeVerifier')

    if code and code_verifier:
        token_info = exchange_code_for_token(code, code_verifier)
        if token_info:
            user = verify_user(token_info['access_token'])
            if user:
                # Retorna información relevante del usuario o una confirmación de inicio de sesión exitoso.
                return JsonResponse({
                    'message': 'Login successful',
                    'user': user.nombres,  # firstName es el nombre en el Json de Clave Única
                    'access_token': token_info['access_token'],
                    'refresh_token': token_info['refresh_token'],
                    'expires_in': token_info.get('expires_in')
                })
            else:
                return JsonResponse({'error': 'User not found or could not be verified'}, status=404)
        else:
            return JsonResponse({'error': 'Failed to exchange code for token'}, status=400)
    return JsonResponse({'error': 'Authorization code or code verifier not provided'}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token_view(request):
    keycloak_config = get_keycloak_config()
    refresh_token = request.data.get('refresh_token')
    print("entró a refresh_token_view")

    if not refresh_token:
        return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        client_id = keycloak_config['resource']
        refresh_token_url = 'https://oid.subdere.gob.cl/realms/app-qa/protocol/openid-connect/token'
        payload = {
            'client_id': client_id,
            'refresh_token': refresh_token,
            'grant_type': 'refresh_token',
        }
        
        print(payload)
        response = requests.post(refresh_token_url, data=payload)
        if response.status_code == 200:
            # Convertir la respuesta a JSON
            token_data = response.json()
            print("Token Data: ", token_data)
            # Asegurarse de devolver el nuevo access_token, refresh_token (si está disponible), y expires_in
            return Response({
                'access_token': token_data.get('access_token'),
                'refresh_token': token_data.get('refresh_token', refresh_token),  # Devolver el nuevo o el mismo refresh_token
                'expires_in': token_data.get('expires_in'),
            })
        else:
            print("Response status code No 200")
            # En caso de error con la solicitud, devolver el mensaje de error de Keycloak
            return Response({'error': 'Failed to refresh token', 'details': response.text}, status=response.status_code)
    except Exception as e:
        return Response({'error': 'An unexpected error occurred', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    keycloak_config = get_keycloak_config()
    # Obtener el refresh token del cuerpo de la solicitud
    refresh_token = request.data.get('refresh_token')

    # Si es un cliente público, el client_secret no es necesario
    client_id = keycloak_config['resource']
    logout_url = "https://oid.subdere.gob.cl/realms/app-qa/protocol/openid-connect/logout"

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    payload = {
        'client_id': client_id,
        'refresh_token': refresh_token,
    }

    # Hacer la solicitud de cierre de sesión a Keycloak
    response = requests.post(logout_url, headers=headers, data=payload)

    if response.status_code in [200, 204]:  # Verifica si la respuesta es exitosa
        return JsonResponse({'message': 'Logout successful'}, status=200)
    else:
        return JsonResponse({'error': 'Failed to logout', 'details': response.text}, status=response.status_code)