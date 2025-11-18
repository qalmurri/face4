from django.db.models.signals import post_migrate
from django.dispatch import receiver
from authentications.models.purpose import Purpose, Destination
import logging

logger = logging.getLogger(__name__)

@receiver(post_migrate)
def create_default_table(sender, **kwargs):
    if sender.name != "authentications":
        return

    purpose_defaults = [
        {"code": "reset_password", "name": "Reset Password"},
        {"code": "verify_email", "name": "Verify Email"},
        {"code": "register_account", "name": "Register Account"},
    ]

    destination_defaults = [
        {"code": "server_auth", "name": "Server Authentication"},
        {"code": "server_user", "name": "Server User"},
        {"code": "server_device", "name": "Server Device"},
        {"code": "server_data", "name": "Server Data"},
        {"code": "server_image", "name": "Server Image"},
    ]

    for item in purpose_defaults:
        obj, created = Purpose.objects.get_or_create(code=item["code"], defaults={"name": item["name"]})
        if created:
            logger.info(f"Created Purpose: {item['code']}")

    for item in destination_defaults:
        obj, created = Destination.objects.get_or_create(code=item["code"], defaults={"name": item["name"]})
        if created:
            logger.info(f"Created Destination: {item['code']}")
