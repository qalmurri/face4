from django.db import models
from django.contrib.auth.models import User

class RegisterVerification(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="verification")
    code = models.CharField(max_length=6)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.user.username} - Verified: {self.is_verified}'