from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    first_name = None
    last_name = None
    date_joined = None
    last_login = None

class Verified(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="verified")
    number = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        db_table = "authentication_user_verified"