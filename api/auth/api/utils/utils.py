from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.utils import timezone
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from datetime import timedelta

from reset.models import PasswordResetRequest


def generate_reset_token(user, expire_hours=0.1):
    """Generate uid, token, and save request"""
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)

    PasswordResetRequest.objects.create(
        user=user,
        uid=uid,
        token=token,
        expired_at=timezone.now() + timedelta(hours=expire_hours)
    )

    return uid, token


def send_reset_email(user, uid, token, frontend_url="http://localhost:5173"):
    """Send reset password email"""
    reset_link = f"{frontend_url}/reset/{uid}/{token}/"
    send_mail(
        subject="Reset Password",
        message=f"Hi {user.username}, klik link berikut untuk reset password:\n{reset_link}",
        from_email="noreply@example.com",
        recipient_list=[user.email],
    )
    return reset_link
