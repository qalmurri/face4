from otp.models import Purpose

class PurposeRepository:
    @staticmethod
    def get_purpose(purpose: str):
        return Purpose.objects.get(code=purpose)