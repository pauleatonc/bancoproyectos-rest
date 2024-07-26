from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import User, Profesion
from applications.regioncomuna.models import Comuna

class ProfesionModelTest(TestCase):

    def test_create_profesion(self):
        profesion = Profesion.objects.create(ocupation="Ingeniero")
        self.assertEqual(profesion.ocupation, "Ingeniero")
        print("Users: Test de creación de profesión: Ok")

class UserModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Profesion.objects.create(ocupation="Ingeniero")
        User.objects.create(
            rut="11111111-1",
            nombres="Juan",
            primer_apellido="Perez",
            segundo_apellido="Gomez",
            comuna="Santiago",
            email="juan@gmail.com"
        )

    def test_valid_rut(self):
        user = User.objects.get(rut="11111111-1")
        self.assertEqual(user.rut, "11111111-1")
        print("Users: Test de RUT válido: Ok")

    def test_invalid_rut(self):
        with self.assertRaises(ValidationError):
            User.objects.create(rut="invalid_rut")
        print("Users: Test de RUT inválido: Ok")

    def test_user_name(self):
        user = User.objects.get(rut="11111111-1")
        self.assertEqual(user.get_full_name(), "Juan Perez Gomez")
        print("Users: Test de nombre completo: Ok")

    def test_user_short_name(self):
        user = User.objects.get(rut="11111111-1")
        self.assertEqual(user.get_short_name(), "Juan")
        print("Users: Test de nombre corto: Ok")

    def test_user_email(self):
        user = User.objects.get(rut="11111111-1")
        self.assertEqual(user.email, "juan@gmail.com")
        print("Users: Test de email: Ok")

    def test_user_is_active(self):
        user = User.objects.get(rut="11111111-1")
        self.assertTrue(user.is_active)
        print("Users: Test de usuario activo: Ok")

    def test_user_is_not_staff(self):
        user = User.objects.get(rut="11111111-1")
        self.assertFalse(user.is_staff)
        print("Users: Test de usuario no administrador: Ok")
