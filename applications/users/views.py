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
from .keycloak_auth import verify_or_create_user


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
def keycloak_login(request):
    token = request.GET.get('token')  # Asumiendo que el token se envía como parte de la solicitud
    user = verify_or_create_user(token)
    if user:
        # Manejar el inicio de sesión del usuario, generar tu propio token para la sesión, etc.
        return JsonResponse({'message': 'Usuario autenticado con éxito'})
    else:
        return JsonResponse({'message': 'Error de autenticación'}, status=401)