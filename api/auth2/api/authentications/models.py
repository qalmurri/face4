"""
Pemanggilan User untuk APP yang lain menggunakan
from django.contrib.auth import get_user_model
User = get_user_model()

Bukan ini, karena ini salah untuk custom user
from django.contrib.auth.models import User
"""

from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4
from django.utils import timezone
from datetime import timedelta

class User(AbstractUser):
    # Default
    email = models.EmailField(unique=True, null=True, blank=True)
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    first_name = None
    last_name = None
    is_staff = None
    is_superuser = None
    last_login = None

    # Custom model
    public_id = models.UUIDField(default=uuid4, unique=True, editable=False)
    phone = models.CharField(max_length=20, unique=True, null=True, blank=True)


class UserVerification(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="verification")
    email_verified = models.BooleanField(default=False)
    phone_verified = models.BooleanField(default=False)
    email_verified_at = models.DateTimeField(null=True, blank=True)
    phone_verified_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = "authentications_user_verification"


class UserDevice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="devices")
    device_type = models.CharField(max_length=50, blank=True, null=True)
    operating_system = models.CharField(max_length=100, blank=True, null=True)
    browser = models.CharField(max_length=100, blank=True, null=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    last_login = models.DateTimeField(default=timezone.now)
    
    class Meta:
        db_table = "authentications_user_device"


class VerificationCode(models.Model):
    """
    Model untuk menyimpan kode verifikasi (OTP) multi-purpose.
    Digunakan untuk: verifikasi email/phone, reset password, 2FA, dll.
    """

    PURPOSE_CHOICES = [
        ("verify_email", "Verify Email"),
        ("verify_phone", "Verify Phone"),
        ("reset_password", "Reset Password"),
        ("two_factor", "Two-Factor Auth"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="verification_codes")

    code = models.CharField(max_length=10)  # bisa numeric atau alphanumeric
    purpose = models.CharField(max_length=32, choices=PURPOSE_CHOICES)

    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)

    class Meta:
        indexes = [
            models.Index(fields=["user", "purpose"]),
            models.Index(fields=["code"]),
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} - {self.purpose} - {self.code}"

    # ---- Utility Methods ---- #

    def is_valid(self) -> bool:
        """
        Cek apakah kode masih berlaku (belum kedaluwarsa dan belum dipakai)
        """
        return not self.is_used and timezone.now() < self.expires_at

    @classmethod
    def create_code(cls, user, code: str, purpose: str, ttl_minutes: int = 10):
        """
        Buat kode baru dan hapus kode lama yang sudah expired untuk efisiensi.
        """
        # Bersihkan kode lama user dengan purpose yang sama
        cls.objects.filter(user=user, purpose=purpose, is_used=False).delete()

        expires_at = timezone.now() + timedelta(minutes=ttl_minutes)
        return cls.objects.create(
            user=user,
            code=code,
            purpose=purpose,
            expires_at=expires_at
        )