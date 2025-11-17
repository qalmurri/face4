from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from core.time.datetimes import current_datetime

class UserDevice(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name="devices"
    )
    
    device_type = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    operating_system = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    browser = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    ip_address = models.GenericIPAddressField(
        blank=True,
        null=True
    )
    
    last_login = models.DateTimeField(
        default=current_datetime
    )