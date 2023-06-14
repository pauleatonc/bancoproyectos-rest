from .base import *
import environ
env = environ.Env()
environ.Env.read_env()

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
DATABASES = {
    # Base de datos de aplicación
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env("NAME"),
        'USER': env("USER"),
        'PASSWORD': env("PASSWORD"),
        'HOST': env("HOST"),
        'PORT': env("PORT"),
    },
    # Base de datos externa
    'externaldb': {
        'ENGINE': 'django.db.backends.mysql', # Necesita instalación de mysqlclient (en reqirements.txt)
        'NAME': env("SEL_DB_NAME"),
        'USER': env("SEL_DB_USER"),
        'PASSWORD': env("SEL_DB_PASSWORD"),
        'HOST': env("SEL_DB_HOST"),
        'PORT': env("SEL_DB_PORT"),
            }
                }

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR.child('static')]

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR.child('media')

# EMAIL SETTINGS
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'modernizacion@subdere.gov.cl'
EMAIL_HOST_PASSWORD = 'Subde*moder23'
EMAIL_PORT = 587


# RECAPTCHA SETTINGS
RECAPTCHA_PUBLIC_KEY = '6Lf4mZAmAAAAAH0Y7t3sHqEImFv2GOeJK-wdv5hb'
RECAPTCHA_PRIVATE_KEY = '6Lf4mZAmAAAAALx8wFRQVFUElg3siKxXRDrzXAY8'

