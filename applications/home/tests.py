from django.test import TestCase
from .models import Contact

class ContactModelTest(TestCase):

    def setUp(self):
        self.contact = Contact.objects.create(
            full_name="Nombre Referencial",
            email="nombre@example.com",
            organization="Mi Organización",
            contact_reason="sugerencia",
            message="Este es un mensaje de prueba."
        )

    def test_string_representation(self):
        self.assertEqual(str(self.contact), "Nombre Referencial")
        print("Home: Test de representación de cadena de parametro nombre, modelo contact: Ok")

    def test_contact_reason_choices(self):
        self.assertIn(self.contact.contact_reason, dict(Contact.CONTACT_REASON_CHOICES).keys())
        print("Home: Test de parametro Reason, modelo Contact: Ok")

    def test_email_field(self):
        self.assertEqual(self.contact.email, "nombre@example.com")
        print("Home: Test de parametro Email, modelo Contact: Ok")

    def test_organization_field(self):
        self.assertEqual(self.contact.organization, "Mi Organización")
        print("Home: Test de parametro Organización, modelo Contact: Ok")

    def test_message_field(self):
        self.assertEqual(self.contact.message, "Este es un mensaje de prueba.")
        print("Home: Test de parametro Message, modelo Contact: Ok")
