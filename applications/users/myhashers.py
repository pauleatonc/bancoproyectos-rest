#El objetivo del presente código es generar un hash que permita la validación de contraseñas
#en MD5 (estandar utilizado por subderenelinea)
#Cómo nos traeremos la BD de usuarios con su clave (metodo update_database.py) debemos ser capaces de leerlas.

import hashlib
from django.contrib.auth.hashers import BasePasswordHasher, mask_hash
from django.utils.crypto import get_random_string, constant_time_compare
from django.utils.datastructures import SortedDict
from django.utils.translation import ugettext_noop as _

class MD5PasswordHasher(BasePasswordHasher):
    algorithm = "md5"

    def salt(self):
        return get_random_string()

    def encode(self, password, salt):
        assert password is not None
        assert salt and '$' not in salt
        hash = hashlib.md5((salt + password).encode('utf-8')).hexdigest()
        return "%s$%s$%s" % (self.algorithm, salt, hash)

    def verify(self, password, encoded):
        algorithm, salt, hash = encoded.split('$', 2)
        assert algorithm == self.algorithm
        encoded_2 = self.encode(password, salt)
        return constant_time_compare(encoded, encoded_2)

    def safe_summary(self, encoded):
        algorithm, salt, hash = encoded.split('$', 2)
        assert algorithm == self.algorithm
        return SortedDict([
            (_('algorithm'), algorithm),
            (_('salt'), mask_hash(salt)),
            (_('hash'), mask_hash(hash)),
        ])