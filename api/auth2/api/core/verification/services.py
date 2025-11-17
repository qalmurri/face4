from authentications.models.verification import VerificationCode
from core.time.validators import calculate_expiry_time
from core.repositories.purpose import PurposeRepository
from core.repositories.verification import VerificationRepository

class VerificationService:

    @classmethod
    def create_code(cls, user, code: str, purpose: str , ttl_minutes: int = 10):
        purpose = PurposeRepository.get_purpose(purpose)
        VerificationRepository.delete_old_codes(user, purpose)
        expires_at = calculate_expiry_time(ttl_minutes)
        return VerificationRepository.create(user, code, purpose, expires_at)