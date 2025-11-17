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