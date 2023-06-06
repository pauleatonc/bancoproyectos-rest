from django.shortcuts import render
from applications.projects.models import Project, Program, Type
from applications.home.models import Contact
from applications.projects.views import ProjectsListView
from django.core.mail import send_mail

from django.views.generic import (
    View,
    TemplateView,
    CreateView
)

# forms
from .forms import ContactForm

class HomePageView(ProjectsListView):
    template_name = 'home/index.html'
    model = Project


class ContactCreateView(CreateView):
    template_name = 'home/contact.html'
    form_class = ContactForm
    model = Contact
    success_url = '.'

    '''def form_valid(self, form):
        # Guardar el formulario y obtener la instancia del modelo
        self.object = form.save()

        # Obtener el correo electrónico ingresado en el formulario
        email = form.cleaned_data['email']

        # Enviar el correo electrónico con los datos del formulario
        send_mail(
            'Copia de formulario de contacto',
            form.cleaned_data['message'],
            'jhearquitecto@gmail.com',  # Correo electrónico del remitente
            [email],  # Correo electrónico del destinatario
            fail_silently=False,
        )

        return super().form_valid(form)'''
