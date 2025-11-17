from django.utils import timezone
from django.db import transaction
from django.contrib.auth import get_user_model, authenticate
from rest_framework import exceptions
from .devices import log_device_login
from .security.tokens import generate_tokens
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

    if register_type == "email":
        user.email = identifier
    elif register_type == "phone":
        user.phone = identifier
    else:
        user.username = identifier

    user.set_password(password)
    user.date_joined = timezone.now()
    user.save()

    print(user.public_id)  # ← sudah otomatis ada

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

    # ✅ Panggil authenticate() langsung — backend akan otomatis menangani email/phone/username
    user = authenticate(request, username=identifier, password=password)

    if user is None:
        raise exceptions.AuthenticationFailed("Invalid credentials.")

    if not user.is_active:
        raise exceptions.PermissionDenied("Account not active. Please verify your account.")

    # Generate JWT tokens
    tokens = generate_tokens(user)

    # Logging device
    log_device_login(request, user)

    return {
        "user": user,
        "tokens": tokens
    }