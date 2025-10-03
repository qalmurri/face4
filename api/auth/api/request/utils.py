from datetime import timedelta

from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.utils import timezone
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator

from .models import VerifiedRequest, ValidityPeriod, Token


def send_email_verification(user, frontend_url="http://localhost:5173"):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    raw_token = default_token_generator.make_token(user)

    #bikin ValidityPeriod
    meta = ValidityPeriod.objects.create(
        expired_at=timezone.now() + timedelta(hours=1)
    )

    #simpan Token ke tabel khusus
    token_obj = Token.objects.create(token=raw_token)

    #simpan StaffActivationRequest dengan relasi ke meta
    VerifiedRequest.objects.create(
        user=user,
        uid=uid,
        token=token_obj,
        is_active=True,
        meta=meta,
    )

    link = f"{frontend_url}/activate-staff/{uid}/{raw_token}/"
    send_mail(
        subject="Staff Activation",
        message=f"Hi {user.username}, klik link berikut untuk aktivasi staff:\n{link}",
        from_email="noreply@example.com",
        recipient_list=[user.email],
    )

    return link


def generate_reset_token(user, expire_hours=0.1):
    """Generate uid, token, and save request"""
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    raw_token = default_token_generator.make_token(user)

    # buat meta record
    meta = ValidityPeriod.objects.create(
        expired_at=timezone.now() + timedelta(hours=expire_hours)
    )

    # 🔹 simpan Token ke tabel khusus
    token_obj = Token.objects.create(token=raw_token)

    # simpan request reset dengan relasi ke meta
    VerifiedRequest.objects.create(
        user=user,
        uid=uid,
        token=token_obj,
        meta=meta,   # 🔹 assign meta
    )

    return uid, raw_token


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