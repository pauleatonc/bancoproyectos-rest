from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
#
from .serializers import ContactSerializer
#
from applications.home.functions import send_email
from applications.home.models import Contact

class ContactCreate(ListCreateAPIView):
    """
    Listado completo de mensajes

    Listado de mensajes enviados a través de Contacto
    """
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()

    def post(self, request):
        """
        Api para POST de Contacto

        Endpoint para el POST de la aplicación Contacto
        """
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            # Obtaining data from the serializer
            client_name = serializer.validated_data['full_name']
            organization = serializer.validated_data['organization']
            contact_reason = serializer.validated_data['contact_reason']
            message = serializer.validated_data['message']
            client_email = serializer.validated_data['email']

            admin_email = settings.ADMIN_EMAIL
            noreplay_email = settings.NOREPLY_EMAIL

            # Sending the email to the admin
            send_email(
                'Razón de contacto: ' + contact_reason + ' - Banco de Proyectos',
                'Ha recibido el siguiente comentario: \n' +
                'Nombre de usuario: ' + client_name + '\n' +
                'Organización: ' + organization + '\n' +
                'Razón de contacto: ' + contact_reason + '\n' +
                'Mensaje: \n\n' + message,
                noreplay_email[0],
                admin_email
            )

            # Sending a copy to the client
            send_email(
                'Razón de contacto: ' + contact_reason + ' - Banco de Proyectos',
                'Su comentario ha sido recepcionado correctamente. A continuación se adjunta una copia de su comentario: \n\n'
                + message,
                noreplay_email[0],
                [client_email]
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)