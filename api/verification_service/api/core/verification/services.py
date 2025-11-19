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
    def check(cls, identifier: str, lookup_field: str, timeout: int = 5):
        try:
            response = requests.post(AUTH_SERVER_URL, json={"identifier": identifier, "lookup_field": lookup_field}, timeout=timeout)
        except requests.exceptions.RequestException:
            return Response({"success": False, "error": "Auth server tidak dapat dihubungi"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        if response.status_code != 200:
            return {"success": False, "error": "auth_error", "status": response.status_code}
        try:
            data = response.json()
        except ValueError:
            return {"success": False, "error": "invalid_json"}
        return {"success": True, "data": data}
    
    @classmethod
    def create_code(cls, public_id, code: str, purpose: str, ttl_minutes: int = 10):
        purpose = PurposeRepository.get_purpose(purpose)
        VerificationRepository.delete_old_codes(public_id, purpose)
        expires_at = calculate_expiry_time(ttl_minutes)
        return VerificationRepository.create(public_id, code, purpose, expires_at)
    
    @classmethod
    def send_reset_password_code(cls, identifier, lookup_field, public_id):
        code = generate_code()
        
        if lookup_field == "email":
            destination = "email"
            send_email_verification(identifier, code)
        elif lookup_field == "phone":
            destination = "phone"
            send_phone_verification(identifier, code)
        else:
            raise ValueError("lookup_field harus 'email' atau 'phone'")

        # Simpan kode berdasarkan public_id (bukan user object)
        cls.create_code(public_id, code, "reset_password")

        return destination