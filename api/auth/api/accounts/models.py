from django.db import models
from django.utils import timezone


class Address(models.Model):
    postal_code = models.CharField(max_length=20)
    created_at = models.DateTimeField(default=timezone.now)


class Display(models.Model):
    photo = models.CharField(max_length=150, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)


class Phone(models.Model):
    country = models.CharField(max_length=255)
    number = models.CharField(max_length=255)

    