"""
Pemanggilan User untuk APP yang lain menggunakan
from django.contrib.auth import get_user_model
User = get_user_model()

Bukan ini, karena ini salah untuk custom user
from django.contrib.auth.models import User
"""

from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    first_name = None
    last_name = None
    date_joined = None
    last_login = None
    is_staff = None
    is_superuser = None
#    number = models.IntegerField()