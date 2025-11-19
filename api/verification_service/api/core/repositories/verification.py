from otp.models import VerificationCode

class VerificationRepository:
    @staticmethod
    def delete_old_codes(public_id, purpose):
        return VerificationCode.objects.filter(
            public_id=public_id,
            purpose=purpose,
            is_used=False
        ).delete()
    @staticmethod
    def create(public_id, code, purpose, expires_at):
        return VerificationCode.objects.create(
            public_id=public_id,
            code=code,
            purpose=purpose,
            expires_at=expires_at
        )