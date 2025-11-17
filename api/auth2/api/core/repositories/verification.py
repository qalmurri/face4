from authentications.models.verification import VerificationCode


class VerificationRepository:
    
    @staticmethod
    def delete_old_codes(user, purpose):
        return VerificationCode.objects.filter(
            user=user,
            purpose=purpose,
            is_used=False
        ).delete()