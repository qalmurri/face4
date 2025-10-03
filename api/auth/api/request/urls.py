from django.urls import path

from .views import EmailVerificationConfirmView, EmailVerificationRequestView, ForgotPasswordCheckView, ForgotPasswordConfirmView, ResetPasswordView, CheckResetPasswordView


urlpatterns = [
    path("request-staff/", EmailVerificationRequestView.as_view(), name="staff-activation-request"),
    path("activate-staff/<uid>/<token>/", EmailVerificationConfirmView.as_view(), name="Email-verification-confirm"),
    path("forgot/check/", ForgotPasswordCheckView.as_view(), name="forgot-check"),
    path("forgot/confirm/", ForgotPasswordConfirmView.as_view(), name="forgot-confirm"),
    path("reset/", ResetPasswordView.as_view(), name="reset-password"),
    path("reset/check/<uid>/<token>/", CheckResetPasswordView.as_view(), name="check-reset"),
]