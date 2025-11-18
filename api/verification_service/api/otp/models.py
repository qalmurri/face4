from django.db import models
from django.contrib.auth import get_user_model
from core.uuid.generate import generate_code
from core.time.timestamps import current_timestamp
from core.verification.otp_validator import is_code_valid

User = get_user_model()

class Purpose(models.Model):
    id = models.AutoField(
        primary_key=True
    )

    code = models.CharField(
        max_length=50,
        unique=True
    )

    name = models.CharField(
        max_length=100
    )


class Destination(models.Model):
    id = models.AutoField(
        primary_key=True
    )

    code = models.CharField(
        max_length=50,
        unique=True
    )
    
    name = models.CharField(
        max_length=100
    )

class VerificationCode(models.Model):
    expires_at = models.BigIntegerField()

    id = models.UUIDField(
        primary_key=True,
        default=generate_code,
        editable=False
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="verification_codes"
    )

    code = models.CharField(
        max_length=10
    )

    purpose = models.ForeignKey(
        Purpose,
        on_delete=models.CASCADE,
        related_name="codes"
    )

    created_at = models.BigIntegerField(
        default=current_timestamp
    )

    is_used = models.BooleanField(
        default=False
    )
    
    used_at = models.BigIntegerField(
        null=True,
        blank=True
    )

    def save(self, *args, **kwargs):
        if self.is_used and self.used_at is None:
            self.used_at = current_timestamp()
        super().save(*args, **kwargs)

    def is_valid(self) -> bool:
        return is_code_valid(self.is_used, self.expires_at)