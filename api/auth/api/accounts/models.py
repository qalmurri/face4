from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
User = get_user_model()

class Address(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="address")
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)

class Display(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="display")
    photo = models.CharField(max_length=150, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[
        ("male", "Male"), ("female", "Female"), ("other", "Other")
        ], blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

class Phone(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="phone")
    country = models.CharField(max_length=255)
    number = models.CharField(max_length=255)