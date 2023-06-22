from django.urls import path

from . import views

app_name = 'users_app'

urlpatterns = [
    path(
        'register/', 
        views.UserRegisterView.as_view(),
        name = 'user-register',
        ),
    path(
        'login/', 
        views.LoginUser.as_view(),
        name = 'user-login',
        ),
    path(
        'logout/', 
        views.LogoutView.as_view(),
        name='user-logout',
    ),
    path(
        'update/', 
        views.UpdatePasswordView.as_view(),
        name='user-update',
    ),
    path(
        'user-verification/<pk>/', 
        views.CodeVerificationView.as_view(),
        name='user-verification',
    ),
    path(
        'admin-home/',
        views.AdminHomeView.as_view(),
        name='admin-home',
    ),
    path(
        'register-success/',
        views.RegisterSuccess.as_view(),
        name='register_success',
    ),
    path(
        'password-recovery',
        views.PasswordRecoveryMain.as_view(),
        name='password_recovery',
    ),
    path(
        'password-recovery-SUBDERE',
        views.PasswordRecoverySubdere.as_view(),
        name='password_recovery_SUBDERE',
    ),
    path(
        'password-recovery-Banco',
        views.PasswordRecoveryBanco.as_view(),
        name='password_recovery_Banco',
    ),
    path(
        'password-recovery-request-success',
        views.PasswordRecoveryRequestSuccess.as_view(),
        name='password_recovery_request_success',
    ),
    path(
        'reset/<uidb64>/<token>/',
        views.CustomPasswordResetConfirmView.as_view(),
        name='password_reset_confirm',
    ),
    path(
        'password-recovery-success',
        views.PasswordRecoverySuccess.as_view(),
        name='password_recovery_success',
    ),

    
]