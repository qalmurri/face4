from django.db import models
from django.utils import timezone

class RequestMeta(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    expired_at = models.DateTimeField(null=True, blank=True)

    def is_expired(self):
        return self.expired_at and self.expired_at < timezone.now()
