from django.shortcuts import render
from django.core.mail import send_mail
from django.urls import reverse_lazy, reverse
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.http import HttpResponseRedirect
from django.contrib import messages

from django.views.generic import (
    View,
    CreateView,
    TemplateView
)

from django.views.generic.edit import (
    FormView
)

from .forms import UserRegisterForm, LoginForm, UpdatePasswordForm, VerificationSignInForm

from .models import User

from .functions import code_generator, validar_rut


class UserRegisterView(LoginRequiredMixin, UserPassesTestMixin, FormView):
    template_name = 'users/register.html'
    form_class = UserRegisterForm
    success_url = reverse_lazy('users_app:user-login')

    def test_func(self):
        return self.request.user.is_staff

    def handle_no_permission(self):
        messages.error(self.request, 'Para acceder al panel de administrador necesitas ingresar con usuario autorizado')
        return redirect('users_app:user-login')

    def form_valid(self, form):
        # Genera un código para validar a través de correo
        #codigo = code_generator()

        usuario = User.objects.create_user(
            form.cleaned_data['rut'],
            form.cleaned_data['password1'],
            email=form.cleaned_data['email'],
            username = form.cleaned_data['username'],
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
        # para recoger el id de la proyecto visitado
        next_url = self.request.GET.get('next', None)
        if next_url:
            return redirect(next_url)
        else:
            return redirect('projects_app:project-list')


class LogoutView(View):

    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponseRedirect(
            reverse(
                'projects_app:project-list'
            )
        )

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