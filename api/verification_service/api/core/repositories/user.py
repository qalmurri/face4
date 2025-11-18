from django.contrib.auth import get_user_model
from core.utils.user_identifier import detect_identifier_type
User = get_user_model()

class UserRepository:
    @staticmethod
    def get_by_identifier(identifier: str):
        lookup_field = detect_identifier_type(identifier)
        try:
            return User.objects.get(**{lookup_field: identifier})
        except User.DoesNotExist:
            return None
        
    @staticmethod
    def get_by_public_id(public_id: str):
        print("testing")
        try:
            return User.objects.get(public_id=public_id)
        except User.DoesNotExist:
            return None

    @staticmethod
    def confirm_user_by_public_id(public_id: str):
        """
        Mengembalikan True jika user dengan public_id ditemukan.
        False jika tidak ada.
        """
        return UserRepository.get_by_public_id(public_id) is not None