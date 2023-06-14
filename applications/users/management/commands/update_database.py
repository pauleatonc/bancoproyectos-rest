from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import connections

class Command(BaseCommand):
    help = 'Actualiza la base de datos local con nuevos usuarios de la base de datos externa'

    def handle(self, *args, **kwargs):

        # Ahora usas el ORM de Django para hacer consultas a tu base de datos externa (subdereenlinea)
        with connections['externaldb'].cursor() as cursor:
            cursor.execute("""
                SELECT
                    CONCAT(us.RUT_USUARIO, '-', UPPER(us.DV)) AS run,
                    us.NOMBRES,
                    us.APELLIDO_PATERNO,
                    us.APELLIDO_MATERNO,
                    com.N_COMUNA,
                    (
                        SELECT hpw.CLAVE_MD5 
                        FROM HISTORIAL_PASSWORD AS hpw 
                        WHERE us.C_USUARIO = hpw.C_USUARIO 
                        ORDER BY hpw.ID DESC 
                        LIMIT 1
                    ) AS clave_md5
                FROM ADMIN_USUARIO AS us
                INNER JOIN ADMIN_USUARIO_PERFIL AS uper ON us.C_USUARIO = uper.C_USUARIO AND uper.C_PERFIL = '0109' AND uper.VIGENTE = 'S'
                INNER JOIN ADMIN_USUARIO_PERFIL_ATRIBUTO AS usat ON us.C_USUARIO = usat.C_USUARIO AND usat.C_PERFIL = '0109' AND usat.C_ATRIBUTO = 1
                INNER JOIN PMB_COMUNAS AS com ON usat.VALOR = com.ID_COMUNA_INE AND com.C_PROVINCIA < 9 AND com.C_COMUNA < 99
            """)
            rows = cursor.fetchall()
            print(rows)

        # Y luego usas el ORM de Django para insertar los datos recuperados en tu base de datos local
        with connections['default'].cursor() as cursor:
            for row in rows:
                # El usuario es identificado por la columna 'rut'
                cursor.execute("SELECT * FROM users_user WHERE rut = %s", [row[0]])
                if cursor.fetchone() is None:  # Si el usuario no existe en la base de datos local
                    # Asumiendo que 'row' es una lista de valores que corresponden a las columnas en tu tabla local de usuarios
                    cursor.execute("INSERT INTO users_user (rut, password, is_superuser, is_staff, is_active) VALUES (%s, %s, %s, %s, %s)", (row[0], row[1], False, False, True))
        self.stdout.write(self.style.SUCCESS('Successfully updated user database')) # Modificar según campos de nueva tabla usuarios