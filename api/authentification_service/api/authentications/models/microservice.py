from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from .purpose import Purpose, Destination
from core.time.timestamps import current_timestamp

class AccountMicroservice(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="microservices"
    )

    purpose = models.ForeignKey(
        Purpose,
        on_delete=models.CASCADE,
        related_name="purposseee"
    )

    destination = models.ForeignKey(
        Destination,
        on_delete=models.CASCADE,
        related_name="destinationss"
    )

    status = models.BooleanField(
        default=False
    )

    created_at = models.BigIntegerField(
        null=False,
        blank=False
    )

    updated_at = models.BigIntegerField(
        default=current_timestamp
    )
