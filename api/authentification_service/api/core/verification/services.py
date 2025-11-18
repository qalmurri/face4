from core.time.validators import calculate_expiry_time
from core.repositories.purpose import PurposeRepository
from core.repositories.verification import VerificationRepository
from core.uuid.generate import generate_uuid4_6int
from core.communications.verification import send_email_verification, send_phone_verification

class VerificationService:
    @classmethod
    def create_code(cls, user, code: str, purpose: str , ttl_minutes: int = 10):
        purpose = PurposeRepository.get_purpose(purpose)
        VerificationRepository.delete_old_codes(user, purpose)
        expires_at = calculate_expiry_time(ttl_minutes)
        return VerificationRepository.create(user, code, purpose, expires_at)
    @classmethod
    def send_reset_password_code(cls, user):
        code = generate_uuid4_6int()
        if hasattr(user, "email") and user.email:
            destination = "email"
            send_email_verification(user.email, code)
        else:
            destination = "phone"
            send_phone_verification(user.phone, code)
        cls.create_code(user, code, "reset_password")
        return destination