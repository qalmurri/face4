from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class PasswordResetRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uid = models.CharField(max_length=255)   # uid base64 dari user.id
    token = models.CharField(max_length=255) # token unik
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    expired_at = models.DateTimeField(null=True, blank=True)

    def deactivate(self):
        self.is_active = False
        self.save()