import requests
from core.time.validate import calculate_expiry_time
from core.repositories.purpose import PurposeRepository
from core.repositories.verification import VerificationRepository
from core.uuid.generate import generate_code
from core.communications.verification import send_email_verification, send_phone_verification

from rest_framework.response import Response
from rest_framework import status

AUTH_SERVER_URL = "http://127.0.0.1:8000/authentications/check-identifier/"

class VerificationService:
    @classmethod
    def check(cls, identifier: str, lookup_field: str):
        """
        Mengirim ke Server Auth untuk mengecek, apakah identifier dalam lookup_field ada di base Server utama
        """
        try:
            response = requests.post(
                AUTH_SERVER_URL,
                json={
                    "identifier": identifier,
                    "lookup_field": lookup_field
                },
                timeout=5
            )
            
        except requests.exceptions.RequestException:
            return Response(
                {
                    "error": "Auth server tidak dapat dihubungi"
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )

        return response.json()
    
    @classmethod
    def create_code(cls, user, code: str, purpose: str , ttl_minutes: int = 10):
        purpose = PurposeRepository.get_purpose(purpose)
        VerificationRepository.delete_old_codes(user, purpose)
        expires_at = calculate_expiry_time(ttl_minutes)
        return VerificationRepository.create(user, code, purpose, expires_at)
    
    @classmethod
    def send_reset_password_code(cls, user):
        code = generate_code()
        if hasattr(user, "email") and user.email:
            destination = "email"
            send_email_verification(user.email, code)
        else:
            destination = "phone"
            send_phone_verification(user.phone, code)
        cls.create_code(user, code, "reset_password")
        return destination
    
