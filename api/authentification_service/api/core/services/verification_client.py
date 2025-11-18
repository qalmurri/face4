import requests
from django.conf import settings


class VerificationService:

    BASE_URL = settings.VERIFICATION_SERVICE_URL  # misal http://127.0.0.1:9000

    @staticmethod
    def send_reset_password_code(user):
        """
        user -> object model user, ambil public_id, email, phone, dsb.
        """

        url = f"{VerificationService.BASE_URL}/verification/send/"

        payload = {
            "user_public_id": str(user.public_id),
            "purpose": "RESET_PASSWORD"
        }

        try:
            response = requests.post(url, json=payload, timeout=5)
        except requests.exceptions.RequestException as e:
            print("Error contacting verification service:", e)
            return None

        if response.status_code == 200:
            return user.email or user.phone

        return None
