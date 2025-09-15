from django.urls import path
from .views import RegisterView, VerifyEmailView, GoogleLoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify/', VerifyEmailView.as_view(), name='verify-email'),
    path('google-login/', GoogleLoginView.as_view(), name='google-login'),
]

"""
POST /api/register/
{
  "username": "qalmurri",
  "email": "qalmurri@example.com",
  "password": "password123"
}

RESPON
(Kirim Email) Halo qalmurri, kode verifikasi Anda adalah: 938201

POST /api/verify/
{
  "email": "qalmurri@example.com",
  "code": "938201"
}

RESPON
{
  "detail": "Verifikasi berhasil. Akun Anda sudah aktif."
}
/
{
    "refresh": "eyJhbG...",
    "access": "eyJhbGc...."
}
"""