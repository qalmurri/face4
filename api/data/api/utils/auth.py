import requests
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

def verify_token(request):
    token = request.headers.get("Authorization")
    if not token:
        raise AuthenticationFailed("Authorization header missing.")

    # Kirim ke server AUTH untuk validasi
    res = requests.post(
        f"{settings.AUTH_SERVER_URL}/auth/tok/ver/",
        headers={"Content-Type": "application/json"},
        json={"token": token.replace("Bearer ", "")}
    )

    if res.status_code != 200:
        raise AuthenticationFailed("Invalid or expired token.")

    return True
