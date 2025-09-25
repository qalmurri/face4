from django.db import models
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User

class StaffActivationRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uid = models.CharField(max_length=255)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateTimeField(default=lambda: timezone.now() + timedelta(hours=1))

    def is_expired(self):
        return timezone.now() > self.expired_at
