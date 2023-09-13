from rest_framework.authentication import get_authorization_header
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import status, authentication
#
from applications.users.authentication import ExpiringTokenAuthentication


class Authentication(authentication.BaseAuthentication):

    user = None
    user_token_expired = False

    def get_user(self, request):
        """
        Return:
            * user      : User instance or
            * message   : Error message or
            * Nonde     : Corrupt Token
        """
        token = get_authorization_header(request).split()
        if token:
            try:
                token = token[1].decode()
            except:
                return None

            token_expire = ExpiringTokenAuthentication()
            message, token, user, self.user_token_expired = token_expire.authenticate_credentials(token)
            if user != None and token != None:
                self.user = user
                return user
            return message

        return None


    def dispatch(self, request, *args, **kwargs):
        user = self.get_user(request)
        # Found token in request
        if user is not None:
            """
            Validaciones desde ExpiringTokenAuthentication.authenticate_credentials
            Possible value of variable user:
            * User instance
            * Message like: Token inválido, Usuario no activo o eliminado, Su token ha expirado
            """
            if type(user) == str:
                response = Response({'error':user,
                                            'expired':self.user_token_expired},
                                            status = status.HTTP_400_BAD_REQUEST)
                response.accepted_renderer = JSONRenderer()
                response.accepted_media_type = 'application/json'
                response.renderer_context = {}
                return response
            if not self.user_token_expired:
                return super().dispatch(request, *args, **kwargs)

        response = Response({'error': 'No se han enviado las credenciales.',
                                    'expired':self.user_token_expired},
                                    status = status.HTTP_400_BAD_REQUEST)
        response.accepted_renderer = JSONRenderer()
        response.accepted_media_type = 'application/json'
        response.renderer_context = {}
        return response

