from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

User = get_user_model()

class MultiFieldModelBackend(ModelBackend):
    """
    Custom authentication backend.
    Memungkinkan login menggunakan email, username, atau phone.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None or password is None:
            return None

        # Coba cari user berdasarkan 3 kemungkinan
        user = (
            User.objects.filter(email=username).first()
            or User.objects.filter(username=username).first()
            or User.objects.filter(phone=username).first()
        )

        # Cek password
        if user and user.check_password(password) and self.user_can_authenticate(user):
            return user

        return None