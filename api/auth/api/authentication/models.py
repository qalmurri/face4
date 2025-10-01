from django.contrib.auth.models import AbstractUser
from django.db import models
from accounts.models import Profile

class User(AbstractUser):
    first_name = None
    last_name = None
    date_joined = None
    last_login = None
    is_verified = models.BooleanField(default=False)
    profile = models.OneToOneField(Profile, on_delete=models.SET_NULL, null=True, blank=True)

