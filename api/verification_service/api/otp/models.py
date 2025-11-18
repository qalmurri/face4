from django.db import models
from uuid import uuid4
from core.time.timestamps import current_timestamp

class VerificationCode(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid4,
        editable=False
    )

    user_public_id = models.UUIDField()  # karena user ada di auth service

    code = models.CharField(max_length=6)

    purpose = models.CharField(max_length=50)

    expires_at = models.BigIntegerField()
    created_at = models.BigIntegerField(default=current_timestamp)

    is_used = models.BooleanField(default=False)
    used_at = models.BigIntegerField(null=True, blank=True)

    def use(self):
        self.is_used = True
        self.used_at = current_timestamp()
        self.save()