from django.db import models
from django.contrib.auth import get_user_model
from .purpose import Purpose
from core.uuid.generate import generate_uuid4
from core.time.timestamps import current_timestamp
from core.verification.otp_validator import is_code_valid

User = get_user_model()

class VerificationCode(models.Model):
    expires_at = models.BigIntegerField()

    id = models.UUIDField(
        primary_key=True,
        default=generate_uuid4,
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