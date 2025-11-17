from django.db import models
from django.contrib.auth.models import AbstractUser
from core.uuid.generate import generate_uuid4

class User(AbstractUser):
    first_name = None
    last_name = None
    is_staff = None
    is_superuser = None
    last_login = None

    email = models.EmailField(
        unique=True,
        null=True,
        blank=True
    )

    username = models.CharField(
        max_length=150,
        unique=True,
        null=True,
        blank=True
    )

    public_id = models.UUIDField(
        default=generate_uuid4,
        unique=True,
        editable=False
    )

    phone = models.CharField(
        max_length=20,
        unique=True,
        null=True,
        blank=True
    )