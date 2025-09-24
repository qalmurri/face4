from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView)
from .views import CheckResetPasswordView, RegisterView, MyTokenObtainPairView, ResetPasswordView, ForgotPasswordCheckView, ForgotPasswordConfirmView, UserMeView, UserUpdateView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("forgot/check/", ForgotPasswordCheckView.as_view(), name="forgot-check"),
    path("forgot/confirm/", ForgotPasswordConfirmView.as_view(), name="forgot-confirm"),
    path("reset/", ResetPasswordView.as_view(), name="reset-password"),
    path("reset/check/<uid>/<token>/", CheckResetPasswordView.as_view(), name="check-reset"),

    path("me/", UserMeView.as_view(), name="user-me"),
    path("update/", UserUpdateView.as_view(), name="user-update"),
]