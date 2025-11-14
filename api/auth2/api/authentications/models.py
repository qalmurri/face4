"""
Pemanggilan User untuk APP yang lain menggunakan
from django.contrib.auth import get_user_model
User = get_user_model()

Bukan ini, karena ini salah untuk custom user
from django.contrib.auth.models import User
"""
import time
from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

def current_timestamp():
    return int(time.time())

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

class Purpose(models.Model):
    """
    Daftar purpose untuk kode verifikasi (contoh: reset password, verifikasi email)
    """
    id = models.AutoField(primary_key=True)
    code = models.CharField(max_length=50, unique=True)  # misalnya: "reset_password"
    name = models.CharField(max_length=100)              # misalnya: "Reset Password"
    class Meta:
        db_table = "authentications_purpose"

class Destination(models.Model):
    id = models.AutoField(primary_key=True)
    code = models.CharField(max_length=50, unique=True)  # misalnya: "reset_password"
    name = models.CharField(max_length=100)              # misalnya: "Reset Password"
    class Meta:
        db_table = "authentications_destination"

class VerificationCode(models.Model):
    """
    Model untuk menyimpan kode verifikasi (OTP) multi-purpose.
    Digunakan untuk: verifikasi email/phone, reset password, 2FA, dll.
    Gunakan epoch timestamp agar lebih ringan dan efisien di DB besar.
    """  
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="verification_codes")
    code = models.CharField(max_length=10)  # bisa numeric atau alphanumeric
    purpose = models.ForeignKey(Purpose, on_delete=models.CASCADE, related_name="codes")
    created_at = models.BigIntegerField(default=current_timestamp)
    expires_at = models.BigIntegerField(null=False, blank=False)
    is_used = models.BooleanField(default=False)
    used_at = models.DateTimeField(null=True, blank=True)
    def save(self, *args, **kwargs):
        # Jika is_used diubah menjadi True dan belum ada used_at, isi otomatis
        if self.is_used and self.used_at is None:
            self.used_at = timezone.now()
        super().save(*args, **kwargs)
    def is_valid(self) -> bool:
        """
        Cek apakah kode masih berlaku (belum kedaluwarsa dan belum dipakai)
        """
        now = int(time.time())
        return not self.is_used and now < self.expires_at
    @classmethod
    def create_code(cls, user, code: str, purpose: str, ttl_minutes: int = 10):
        """
        Buat kode baru dan hapus kode lama yang sudah expired untuk efisiensi.
        """
        # Bersihkan kode lama user dengan purpose yang sama
        purpose_obj = Purpose.objects.get(code=purpose)
        cls.objects.filter(user=user, purpose=purpose_obj, is_used=False).delete()
        now = int(time.time())
        expires_at = now + (ttl_minutes * 60)
        return cls.objects.create(
            user=user,
            code=code,
            purpose=purpose_obj,
            expires_at=expires_at
        )
    class Meta:
        db_table = "authentications_verification_code"
        indexes = [
            models.Index(fields=["user", "purpose", "code"]),
            models.Index(fields=["expires_at"]),
        ]

class AccountMicroservice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="AccountMicroservice")
    purpose = models.ForeignKey(Purpose, on_delete=models.CASCADE, related_name="codes2")
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name="destination")
    status = models.BooleanField(default=False)
    created_at = models.BigIntegerField(null=False, blank=False)
    update_created_at = models.BigIntegerField(default=current_timestamp)
