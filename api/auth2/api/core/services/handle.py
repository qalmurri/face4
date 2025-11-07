from django.utils import timezone
from django.db import transaction
from django.contrib.auth import get_user_model, authenticate
from rest_framework import exceptions
from .communication import send_verification
from core.devices import log_device_login
from core.services.tokens import generate_tokens
import logging

User = get_user_model()
logger = logging.getLogger(__name__)


@transaction.atomic
def handle_register(validated_data, context):
    """
    Logika register: membuat user baru, kirim email verifikasi, dll.
    """
    register_type = context["register_type"]
    identifier = validated_data["identifier"]
    password = validated_data["password"]

    user = User()
    # user.is_active = False  # akun belum aktif sebelum verifikasi

    if register_type == "email":
        user.email = identifier
    elif register_type == "phone":
        user.phone = identifier
    else:
        user.username = identifier

    user.set_password(password)
    user.date_joined = timezone.now()
    user.save()

    # Kirim email verifikasi kalau register pakai email
    # try:
    #     if register_type == "email":
    #         send_verification("email", user.email)
    # except Exception as e:
    #     logger.error(f"Failed to send verification for {identifier}: {e}")

    return user


@transaction.atomic
def handle_login(validated_data, request):
    """
    Autentikasi user, generate token, dan logging device.
    """
    identifier = validated_data["identifier"]
    password = validated_data["password"]

    user = (
        User.objects.filter(email=identifier).first()
        or User.objects.filter(username=identifier).first()
        or User.objects.filter(phone=identifier).first()
    )

    if not user:
        raise exceptions.NotFound("User not found.")

    if not user.is_active:
        raise exceptions.PermissionDenied("Account not active. Please verify your account.")

    # Autentikasi via Django
    user_auth = authenticate(request, username=user.username, password=password)
    if not user_auth:
        raise exceptions.AuthenticationFailed("Invalid credentials.")

    # Generate JWT tokens
    tokens = generate_tokens(user_auth)

    # otomatis log aktivitas login
    log_device_login(request, user)

    return {
        "user": user_auth,
        "tokens": tokens
    }