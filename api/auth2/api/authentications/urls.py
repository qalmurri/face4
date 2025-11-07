from django.urls import path
from .views import register, login, logout, token

urlpatterns = [
    # Core
    path('register/', register.RegisterView.as_view(), name='register'),
    path('login/', login.LoginView.as_view(), name='login'),
    path('token/refresh/', token.TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', logout.LogoutView.as_view(), name='login'),

    # Token check
    path('token/check/', token.CheckTokenView.as_view(), name='check_token'),
    path('token/check/raw', token.CheckTokenRawView.as_view(), name='check_token_raw'),

    # Verification
    # path('verify/email/', VerifyEmailView.as_view(), name='verify_email'),
    # path('verify/phone/', VerifyPhoneView.as_view(), name='verify_phone'),
    # path('resend-verification/', ResendVerificationView.as_view(), name='resend_verification'),

    # Password management
    # path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    # path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    # path('change-password/', ChangePasswordView.as_view(), name='change_password'),

    # (Optional) device/session security
    # path('devices/', UserDeviceListView.as_view(), name='user_devices'),
    # path('devices/<uuid:id>/logout/', UserDeviceLogoutView.as_view(), name='device_logout'),
    # path('security/status/', SecurityStatusView.as_view(), name='security_status'),
]

# FLOW
# | Endpoint                           | Fungsi                                                   | Alasan penting                                       |
# | ---------------------------------- | -------------------------------------------------------- | ---------------------------------------------------- |
# | `/verify-email/`                   | Aktivasi akun setelah register (token dikirim via email) | Menghindari spam & bot account                       |
# | `/resend-verification/`            | Kirim ulang email verifikasi                             | Meningkatkan UX untuk user yang tidak menerima email |
# | `/forgot-password/`                | Minta token reset password via email                     | Standar keamanan wajib                               |
# | `/reset-password/`                 | Setel ulang password berdasarkan token                   | Untuk pemulihan akun                                 |
# | `/change-password/`                | Ubah password bagi user yang login                       | Untuk keamanan dan kontrol user                      |
# | `/me/` atau `/profile/`            | Endpoint untuk cek data user (autentikasi via JWT)       | Untuk dashboard / front-end                          |
# | `/revoke-all-tokens/` *(opsional)* | Logout semua sesi dari semua perangkat                   | Berguna jika user merasa token bocor                 |
