from django.db import models
from django.utils import timezone


class ValidityPeriod(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    expired_at = models.DateTimeField(null=True, blank=True)

    def is_expired(self):
        return self.expired_at and self.expired_at < timezone.now()

    def __str__(self):
        return f"Meta(created={self.created_at}, expired={self.expired_at})"


class Token(models.Model):
    token = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"Token({self.token})"