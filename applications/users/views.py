from django.shortcuts import render
from django.core.mail import send_mail
from django.urls import reverse_lazy, reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect

from django.views.generic import (
    View,
    CreateView
)

from django.views.generic.edit import (
    FormView
)

from .forms import UserRegisterForm, LoginForm, UpdatePasswordForm, VerificationSignInForm

from .models import User

from .functions import code_generator, validar_rut


class UserRegisterView(FormView):
    template_name = 'users/register.html'
    form_class = UserRegisterForm
    success_url = reverse_lazy('users_app:user-login')

    def form_valid(self, form):
        # Genera un código para validar a través de correo
        #codigo = code_generator()

        usuario = User.objects.create_user(
            form.cleaned_data['email'],
            form.cleaned_data['password1'],
            username = form.cleaned_data['username'],
            nombres = form.cleaned_data['nombres'],
            apellidos = form.cleaned_data['apellidos'],
            pais = form.cleaned_data['pais'],
            date_birth = form.cleaned_data['date_birth'],
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
    success_url = reverse_lazy('projects_app:project-list')

    def form_valid(self, form):
        user = authenticate(
            rut = form.cleaned_data['rut'],
            password = form.cleaned_data['password']
        )
        login(self.request, user)
        return super(LoginUser, self).form_valid(form)


class LogoutView(View):

    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponseRedirect(
            reverse(
                'home_app:index'
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