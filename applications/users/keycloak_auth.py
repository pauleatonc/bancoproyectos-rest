from django.contrib.auth import get_user_model
from keycloak import KeycloakOpenID
from projectbank.settings.local import KEYCLOAK_CONFIG

def verify_or_create_user(token):
    keycloak_openid = KeycloakOpenID(server_url=KEYCLOAK_CONFIG['auth-server-url'],
                                      client_id=KEYCLOAK_CONFIG['resource'],
                                      realm_name=KEYCLOAK_CONFIG['realm'],
                                      client_secret_key=KEYCLOAK_CONFIG['credentials']['secret'])
    
    token_info = keycloak_openid.decode_token(token, key=KEYCLOAK_CONFIG['credentials']['secret'])
    username = token_info['preferred_username']

    User = get_user_model()
    user, created = User.objects.get_or_create(username=username)
    
    if created:
        user.email = token_info.get('email', '')
        user.save()
    
    return user
