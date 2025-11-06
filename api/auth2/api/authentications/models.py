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

class User(AbstractUser):
    # Default
    email = models.EmailField(unique=True, null=True, blank=True)
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    first_name = None
    last_name = None
    is_staff = None
    is_superuser = None

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