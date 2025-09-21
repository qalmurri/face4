from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView)
from .views import RegisterView, MyTokenObtainPairView, ForgotPasswordView, ResetPasswordView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("reset/", ResetPasswordView.as_view(), name="reset-password"),
]