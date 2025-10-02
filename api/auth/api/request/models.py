from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


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


class VerifiedRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uid = models.CharField(max_length=255)
    token = models.OneToOneField(Token, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    meta = models.OneToOneField(ValidityPeriod, on_delete=models.CASCADE)

    def deactivate(self):
        self.is_active = False
        self.save()

    class Meta:
        db_table = "request_verified"