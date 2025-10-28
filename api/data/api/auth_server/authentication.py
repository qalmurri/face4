import requests
from django.core.cache import cache
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings

class ExternalJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        token = auth_header.split(" ")[1]

        # Cek cache dulu
        if cache.get(f"valid_token:{token}"):
            return (None, token)

        # Verifikasi ke Auth Server
        verify_url = settings.AUTH_SERVER_URL
        res = requests.post(verify_url, data={"token": token})
        if res.status_code != 200:
            raise AuthenticationFailed("Token tidak valid")

        # Simpan hasil ke cache selama 1 menit
        cache.set(f"valid_token:{token}", True, timeout=60)
        return (None, token)
