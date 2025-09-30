from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta

from verification.models import StaffActivationRequest
from core2.models import ValidityPeriod, Token


def send_staff_activation_email(user, frontend_url="http://localhost:5173"):
    """Send staff activation email"""
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    raw_token = default_token_generator.make_token(user)

    # 🔹 bikin ValidityPeriod
    meta = ValidityPeriod.objects.create(
        expired_at=timezone.now() + timedelta(hours=1)
    )

    # 🔹 simpan Token ke tabel khusus
    token_obj = Token.objects.create(token=raw_token)

    # 🔹 simpan StaffActivationRequest dengan relasi ke meta
    StaffActivationRequest.objects.create(
        user=user,
        uid=uid,
        token=token_obj,
        is_active=True,
        meta=meta,
    )

    # 🔹 kirim email
    link = f"{frontend_url}/activate-staff/{uid}/{raw_token}/"
    send_mail(
        subject="Staff Activation",
        message=f"Hi {user.username}, klik link berikut untuk aktivasi staff:\n{link}",
        from_email="noreply@example.com",
        recipient_list=[user.email],
    )
    return link
