from django.db.models.signals import post_migrate
from django.dispatch import receiver
from authentications.models import VerificationPurpose

@receiver(post_migrate)
def create_default_purposes(sender, **kwargs):
    if sender.name != "authentications":
        return

    defaults = [
        {"codename": "reset_password", "name": "Reset Password"},
        {"codename": "verify_email", "name": "Verify Email"},
    ]

    for item in defaults:
        VerificationPurpose.objects.get_or_create(code=item["codename"], defaults={"name": item["name"]})