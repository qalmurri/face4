from authentications.models.verification import VerificationCode

class VerificationRepository:
    
    @staticmethod
    def delete_old_codes(user, purpose):
        return VerificationCode.objects.filter(
            user=user,
            purpose=purpose,
            is_used=False
        ).delete()
    
    @staticmethod
    def create(user, code, purpose, expires_at):
        return VerificationCode.objects.create(
            user=user,
            code=code,
            purpose=purpose,
            expires_at=expires_at
        )
    
    @staticmethod
    def get_latest_reset_password_code(user, code):
        try:
            return VerificationCode.objects.filter(
                user=user,
                code=code,
                purpose__code="reset_password"
            ).latest("created_at")
        except VerificationCode.DoesNotExist:
            return None