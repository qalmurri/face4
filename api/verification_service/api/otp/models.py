from django.db import models
from core.uuid.generate import generate_code
from core.time.timestamps import current_timestamp
from core.verification.otp_validator import is_code_valid

class Purpose(models.Model):
    id = models.AutoField(primary_key=True)
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)

class Destination(models.Model):
    id = models.AutoField(primary_key=True)
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)

class VerificationCode(models.Model):
    created_at = models.BigIntegerField(default=current_timestamp)
    expires_at = models.BigIntegerField()
    used_at = models.BigIntegerField(null=True, blank=True)
    purpose = models.ForeignKey(Purpose, on_delete=models.CASCADE, related_name="codes")
    is_used = models.BooleanField(default=False)
    code = models.CharField(max_length=10)
    public_id = models.UUIDField()
    link = models.CharField(default=generate_code)

    def save(self, *args, **kwargs):
        if self.is_used and self.used_at is None:
            self.used_at = current_timestamp()
        super().save(*args, **kwargs)
    def is_valid(self) -> bool:
        return is_code_valid(self.is_used, self.expires_at)