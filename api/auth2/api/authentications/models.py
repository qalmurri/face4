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