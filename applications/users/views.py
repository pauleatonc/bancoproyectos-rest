from datetime import datetime
#
from django.contrib.sessions.models import Session
from django.contrib.auth  import authenticate
#
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
#
from applications.users.api.v1.serializers import CustomTokenObtainPairSerializer, UserSerializer
from applications.users.models import User
# keycloak configuration
from django.http import JsonResponse
from .keycloak_auth import verify_user
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.shortcuts import redirect
from .functions import exchange_code_for_token  # Asume que has puesto la función aquí
from django.contrib.auth import login as django_login
import logging

logger = logging.getLogger(__name__)

class Login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *arg, **kwargs):
        username = request.data.get('rut', '')
        password = request.data.get('password', '')
        user = authenticate(
            username = username,
            password = password
        )

        if user:
            login_serializer = self.serializer_class(data = request.data)
            if login_serializer.is_valid():
                user_serializer = UserSerializer(user)
                return Response({
                    'token': login_serializer.validated_data.get('access'),
                    'refresh-token': login_serializer.validated_data.get('refresh'),
                    'user': user_serializer.data,
                    'message': 'Inicio de Sesión exitoso.'
                }, status = status.HTTP_200_OK)
            return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status = status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    def post(self, request, *args, **kwargs):
        user = User.objects.filter(id=request.data.get('user', 0))
        if user.exists():
            RefreshToken.for_user(user.first())
            return Response({'message': 'Sesión cerrada correctamente.'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe este usuario.'}, status=status.HTTP_400_BAD_REQUEST)


#keycloak configuration
@api_view(['GET'])
@permission_classes([AllowAny])
def keycloak_code_exchange_view(request):
    logger.debug("1")
    print("1")
    code = request.GET.get('code', None)
    if code:
        print("2")
        token_info = exchange_code_for_token(code)
        print("3")
        if token_info:
            # Aquí podrías hacer lo que necesites con el token_info, como crear una sesión
            print("4")
            user = verify_user(token_info['access_token'])
            print("5")
            if user:
                # Inicia sesión para el usuario en tu app
                print("6")
                django_login(request, user)
                print("7")

            else:
                # Manejar caso en que el usuario no existe o no pudo ser verificado
                return JsonResponse({'error': 'User not found or could not be verified'}, status=404)
        else:
            return JsonResponse({'error': 'Failed to exchange code for token'}, status=400)
    # Manejar el caso de error o ausencia de código
    return JsonResponse({'error': 'Authorization code not provided or token exchange failed'}, status=400) 
