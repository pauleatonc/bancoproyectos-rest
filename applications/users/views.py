from django.shortcuts import render
from django.conf import settings
from sendgrid.helpers.mail import Mail
from sendgrid import SendGridAPIClient
from django.urls import reverse_lazy, reverse
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.views import PasswordResetView, PasswordResetConfirmView
from django.contrib import messages
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.shortcuts import get_object_or_404
from datetime import datetime

from django.views.generic import (
    View,
    CreateView,
    TemplateView
)

from django.views.generic.edit import (
    FormView
)

from .forms import UserRegisterForm, LoginForm, UpdatePasswordForm, VerificationSignInForm, PasswordRecoveryForm

# Models
from .models import User
from applications.projects.models import Program, Type

from .functions import code_generator, validar_rut

def send_email(subject, content, from_email, to_emails):
    message = Mail(
        from_email=from_email,
        to_emails=to_emails,
        subject=subject,
        plain_text_content=content)

    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)



class UserRegisterView(LoginRequiredMixin, UserPassesTestMixin, FormView):
    template_name = 'users/register.html'
    form_class = UserRegisterForm
    model = User
    success_url = reverse_lazy('users_app:register_success')

    def test_func(self):
        return self.request.user.is_staff

    def handle_no_permission(self):
        messages.error(self.request, 'Para acceder al panel de administrador necesitas ingresar con usuario autorizado')
        return redirect('users_app:user-login')

    def form_valid(self, form):
        # Genera un código para validar a través de correo
        #codigo = code_generator()

        usuario = User.objects.create_user(
            rut=form.cleaned_data['rut'],
            password=form.cleaned_data['password1'],
            nombres=form.cleaned_data['nombres'],
            primer_apellido=form.cleaned_data['primer_apellido'],
            segundo_apellido=form.cleaned_data['segundo_apellido'],
            institucion=form.cleaned_data['institucion'],
            email=form.cleaned_data['email'],

            #codregistro = codigo
        )

        return super(UserRegisterView, self).form_valid(form)

        """# enviar el codigo al email del user
        asunto = 'Email de confirmación ArchiPartner'
        mensaje = 'El código de verificación es: ' + codigo
        email_remitente = 'jhearquitecto@gmail.com'
        #
        send_mail(asunto, mensaje, email_remitente, [form.cleaned_data['email'],])

        # Redirigir a pantalla de validación
        return HttpResponseRedirect(
            reverse(
                'users_app:user-verification',
                kwargs={'pk': usuario.id}
            )
        )"""

class LoginUser(FormView):
    template_name = 'users/login.html'
    form_class = LoginForm

    def form_valid(self, form):
        user = authenticate(
            rut=form.cleaned_data['rut'],
            password=form.cleaned_data['password']
        )
        login(self.request, user)

        # Agregamos un método para redirigir a la página desde donde se originó el login
        # en el html se debe agregar ?next={{ request.path }} a continuación del href {% url 'users_app:user-login' %}
        # para recoger el id del proyecto visitado
        next_url = self.request.GET.get('next', None)
        if next_url:
            return redirect(next_url)
        else:
            return redirect('projects_app:project-list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['programs'] = Program.objects.all()
        context['types'] = Type.objects.all()

        return context


class LogoutView(View):

    def get(self, request, *args, **kwargs):
        logout(request)
        return redirect(self.request.META.get('HTTP_REFERER', '/'))


class UpdatePasswordView(LoginRequiredMixin, FormView):
    template_name = 'users/update.html'
    form_class = UpdatePasswordForm
    success_url = reverse_lazy('users_app:user-login')
    login_url = reverse_lazy('users_app:user-login')

    def form_valid(self, form):
        usuario = self.request.user
        user = authenticate(
            email=usuario.email,
            password=form.cleaned_data['password1']
        )

        if user:
            new_password = form.cleaned_data['password2']
            usuario.set_password(new_password)
            usuario.save()

        logout(self.request)
        return super(UpdatePasswordView, self).form_valid(form)

class CodeVerificationView(FormView):
    template_name = 'users/verification.html'
    form_class = VerificationSignInForm
    success_url = reverse_lazy('users_app:user-login')

    def get_form_kwargs(self):
        kwargs = super(CodeVerificationView, self).get_form_kwargs()
        kwargs.update({
            'pk': self.kwargs['pk'],
        })
        return kwargs

    def form_valid(self, form):
        #
        User.objects.filter(
            id=self.kwargs['pk']
        ).update(
            is_active=True
        )
        return super(CodeVerificationView, self).form_valid(form)

class AdminHomeView(LoginRequiredMixin, UserPassesTestMixin, TemplateView):
    template_name = 'users/admin_home.html'
    login_url = reverse_lazy('users_app:user-login')

    def test_func(self):
        return self.request.user.is_staff

    def handle_no_permission(self):
        messages.error(self.request, 'Para acceder al panel de administrador necesitas ingresar con usuario autorizado')
        return redirect('users_app:user-login')

class RegisterSuccess(LoginRequiredMixin, TemplateView):
    template_name = 'users/register_success.html'
    login_url = reverse_lazy('users_app:user-login')

    def test_func(self):
        return self.request.user.is_staff

    def handle_no_permission(self):
        messages.error(self.request, 'No tienes los permisos para crear usuarios')
        return redirect('users_app:user-login')

class PasswordRecoveryMain(TemplateView):
    def get(self, request):
        form = PasswordRecoveryForm()
        return render(request, 'users/password_recovery_main.html', {'form': form})

    def post(self, request):
        form = PasswordRecoveryForm(request.POST)

        if form.is_valid():
            rut = form.cleaned_data['rut']
            user = User.objects.get(rut=rut)
            request.session['rut_value'] = rut

            if user.tipo_usuario == 'SUBDERE':
                # Realiza las acciones correspondientes para el tipo de usuario 'SUBDERE'
                return redirect('users_app:password_recovery_SUBDERE')
            elif user.tipo_usuario == 'BANCO':
                # Realiza las acciones correspondientes para el tipo de usuario 'BANCO'
                return redirect('users_app:password_recovery_Banco')

        return render(request, 'users/password_recovery_main.html', {'form': form})


class PasswordRecoverySubdere(TemplateView):
    template_name = 'users/password_recovery_SUBDERE.html'

    def get_context_data(self, **kwargs):
        # Obtener el valor del campo "rut" de la vista anterior
        rut_value = self.request.session.get('rut_value', '')

        context = super().get_context_data(**kwargs)
        context['rut_value'] = rut_value
        return context

class PasswordRecoveryBanco(PasswordResetView):
    template_name = 'users/password_recovery_Banco.html'
    email_template_name = 'users/password_reset_email.html'
    success_url = 'users_app:password_recovery_request_success'

    def get_context_data(self, **kwargs):
        # Obtener el valor del campo "rut" de la vista anterior
        rut = self.request.session.get('rut_value', '')
        user = User.objects.get(rut=rut)
        email_value = user.email

        # Obtener el nombre de usuario y el dominio del correo electrónico
        username, domain = email_value.split('@')

        # Aplicar la máscara a los caracteres del nombre de usuario
        masked_username = username[:3] + '*' * (len(username) - 3)

        # Reconstruir el correo electrónico con el nombre de usuario oculto
        masked_email = masked_username + '@' + domain

        context = super().get_context_data(**kwargs)
        context['email_value'] = masked_email
        return context

    def post(self, request, *args, **kwargs):
        # Obtener el valor del campo "rut" de la vista anterior
        rut = request.session.get('rut_value', '')
        user = User.objects.get(rut=rut)

        # Generar los datos necesarios para el correo de recuperación de contraseña
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        # Construir la URL para el restablecimiento de contraseña
        reset_url = request.build_absolute_uri(reverse('users_app:password_reset_confirm', kwargs={'uidb64': uid, 'token': token}))

        # Correos destinatarios como admin
        noreplay_email = settings.NOREPLY_EMAIL

        # Enviar el correo electrónico de recuperación de contraseña
        send_email(
            # Subject
            'Banco de Proyectos: Recuperación de contraseña',
            # Content
            'Hola {},\n\n'.format(user.nombres) +
            'Acabas de solicitar un cambio de contraseña para ingresar al Banco de Proyectos.\n\n'
            'Para esto, dirígete a este enlace para crear una nueva contraseña: {}\n\n'.format(reset_url) +
            'Si crees que esto es un error o no fuiste tú, haz caso omiso a este correo y ponte en contacto con '
            'nosotros mediante este correo modernizacion@subdere.gov.cl.\n',
            # From email
            noreplay_email[0],
            # To emails
            [user.email],
        )

        # Redireccionar a la página de éxito y mostrar un mensaje
        messages.success(request, 'Se ha enviado un correo de recuperación de contraseña.')
        return redirect(reverse(self.get_success_url()))


class PasswordRecoveryRequestSuccess(TemplateView):
    template_name = 'users/password_recovery_request_success.html'

    def get_context_data(self, **kwargs):
        # Obtener el valor del campo "rut" de la vista anterior
        rut = self.request.session.get('rut_value', '')
        user = User.objects.get(rut=rut)
        email_value = user.email

        # Obtener el nombre de usuario y el dominio del correo electrónico
        username, domain = email_value.split('@')

        # Aplicar la máscara a los caracteres del nombre de usuario
        masked_username = username[:3] + '*' * (len(username) - 3)

        # Reconstruir el correo electrónico con el nombre de usuario oculto
        masked_email = masked_username + '@' + domain

        context = super().get_context_data(**kwargs)
        context['email_value'] = masked_email
        return context


class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    template_name = 'users/password_recovery_form.html'
    success_url = reverse_lazy('users_app:password_recovery_success')

    def form_valid(self, form):
        form.save()

        # Obtener el usuario
        user = form.user
        fecha_cambio = datetime.now().strftime('%d-%m-%Y - %H:%M:%S')

        # Correos destinatarios como admin
        noreplay_email = settings.NOREPLY_EMAIL

        # Construir el contenido del correo electrónico
        content = 'Hola {},\n\n'.format(user.nombres)

        if user.nombres:
            content += 'Nombre: {}\n'.format(user.nombres)

        if user.rut:
            content += 'RUT: {}\n'.format(user.rut)

        if user.institucion:
            content += 'Institución: {}\n'.format(user.institucion)

        if user.email:
            content += 'Correo: {}\n'.format(user.email)

        content += '\nFecha de cambio de contraseña: {}\n\n'.format(fecha_cambio)

        content += 'Si crees que esto es un error o no fuiste tú, haz caso omiso a este correo y ponte en contacto ' \
                   'con nosotros mediante este correo modernizacion@subdere.gov.cl.\n'

        # Enviar el correo electrónico de éxito del cambio de contraseña
        send_email(
            # Subject
            'Banco de Proyectos: Realizaste un cambio de contraseña',
            # Content
            content,
            # From email
            noreplay_email[0],
            # To emails
            [user.email],
        )

        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Obtener los valores de uid y token
        uid = self.kwargs['uidb64']
        token = self.kwargs['token']

        # Asignar los valores de uidb64 y token al contexto
        context['uid'] = uid
        context['token'] = token

        try:
            # Decodificar el uidb64 y obtener el usuario correspondiente
            uid = urlsafe_base64_decode(uid).decode()
            user = get_object_or_404(User, pk=uid)

            # Agregar el nombre de usuario y correo electrónico al contexto
            context['nombre'] = user.nombres
            context['email'] = user.email
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            # Manejar el error si no se puede decodificar el uidb64 o el usuario no existe
            context['nombre'] = ''
            context['email'] = ''

        return context

class PasswordRecoverySuccess(TemplateView):
    template_name = 'users/password_recovery_success.html'

