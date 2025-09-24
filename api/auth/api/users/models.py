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

class UserActionLog(models.Model):
    ACTION_CHOICES = [
        ("REGISTER", "Register"),
        ("LOGIN", "Login"),
        ("FORGOT_PASSWORD", "Forgot Password Request"),
        ("RESET_PASSWORD", "Reset Password"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.action} - {self.created_at}"