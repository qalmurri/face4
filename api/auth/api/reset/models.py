from django.db import models
from django.contrib.auth.models import User
from core2.models import RequestMeta  # 🔹 ganti utils -> core

class PasswordResetRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uid = models.CharField(max_length=255)
    token = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    meta = models.OneToOneField(RequestMeta, on_delete=models.CASCADE)

    def deactivate(self):
        self.is_active = False
        self.save()
