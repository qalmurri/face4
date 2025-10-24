from django.urls import path
from .views import EmailVerificationConfirmView, EmailVerificationRequestView, ForgotPasswordCheckView, ForgotPasswordConfirmView, ResetPasswordView, CheckResetPasswordView


urlpatterns = [
    path("req-staff/", EmailVerificationRequestView.as_view(), name="staff-activation-request"),
    path("act-staff/<uid>/<token>/", EmailVerificationConfirmView.as_view(), name="Email-verification-confirm"),
    path("for/check/", ForgotPasswordCheckView.as_view(), name="forgot-check"),
    path("for/confirm/", ForgotPasswordConfirmView.as_view(), name="forgot-confirm"),
    path("res/", ResetPasswordView.as_view(), name="reset-password"),
    path("res/check/<uid>/<token>/", CheckResetPasswordView.as_view(), name="check-reset"),
]