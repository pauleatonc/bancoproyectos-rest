from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import connections

class Command(BaseCommand):
    help = 'Actualiza la base de datos local con nuevos usuarios de la base de datos externa'

    def handle(self, *args, **kwargs):

        # Ahora puedes usar el ORM de Django para hacer consultas a tu base de datos externa
        with connections['externaldb'].cursor() as cursor:
            cursor.execute("SELECT rut, password FROM \"User\";")
            rows = cursor.fetchall()
            print(rows)

        # Y luego puedes usar el ORM de Django para insertar los datos recuperados en tu base de datos local
        with connections['default'].cursor() as cursor:
            for row in rows:
                # Asumiendo que el usuario es identificado por la columna 'columna_usuario'
                cursor.execute("SELECT * FROM users_user WHERE rut = %s", [row[0]])
                if cursor.fetchone() is None:  # Si el usuario no existe en la base de datos local
                    # Asumiendo que 'row' es una lista de valores que corresponden a las columnas en tu tabla local de usuarios
                    cursor.execute("INSERT INTO users_user (rut, password, is_superuser, is_staff, is_active) VALUES (%s, %s, %s, %s, %s)", (row[0], row[1], False, False, True))
        self.stdout.write(self.style.SUCCESS('Successfully updated user database'))