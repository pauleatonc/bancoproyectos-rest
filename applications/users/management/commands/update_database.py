from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import connections

class Command(BaseCommand):
    help = 'Actualiza la base de datos local con nuevos usuarios de la base de datos externa'

    def handle(self, *args, **kwargs):
        # Configuración de las bases de datos
        DATABASES = {
            'external_db': {
                'ENGINE': 'django.db.backends.postgresql',  # O 'django.db.backends.mysql' para MySQL
                'NAME': 'nombre_de_tu_base_de_datos_externa',
                'USER': 'tu_usuario_externo',
                'PASSWORD': 'tu_contraseña_externa',
                'HOST': 'host_de_tu_base_de_datos_externa',
                'PORT': 'puerto_de_tu_base_de_datos_externa',
            },
            # Base de datos local
            'default': {
                'ENGINE': 'django.db.backends.postgresql_psycopg2',
                'NAME': 'projectbank',
                'USER': 'postgres',
                'PASSWORD': 'Subdere.2022',
                'HOST': 'localhost',
                'PORT': '5432',
            }
                }

        # Actualiza la configuración de Django
        settings.configure(DATABASES=DATABASES)

        # Ahora puedes usar el ORM de Django para hacer consultas a tu base de datos externa
        with connections['external_db'].cursor() as cursor:
            cursor.execute("SELECT * FROM nombre_de_tu_tabla WHERE columna_usuario = %s", ['usuarios'])
            rows = cursor.fetchall()

        # Y luego puedes usar el ORM de Django para insertar los datos recuperados en tu base de datos local
        with connections['local_db'].cursor() as cursor:
            for row in rows:
                # Asumiendo que el usuario es identificado por la columna 'columna_usuario'
                cursor.execute("SELECT * FROM tu_tabla_local WHERE columna_usuario = %s", [row[0]])
                if cursor.fetchone() is None:  # Si el usuario no existe en la base de datos local
                    # Asumiendo que 'row' es una lista de valores que corresponden a las columnas en tu tabla local de usuarios
                    cursor.execute("INSERT INTO tu_tabla_local (columna1, columna2, ...) VALUES (%s, %s, ...)", row)