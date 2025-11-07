from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.response import Response
from rest_framework import status

def refresh_access_token(refresh_token: str):
    """
    Fungsi untuk membuat access token baru dari refresh token.
    """
    try:
        # Coba decode refresh token
        refresh = RefreshToken(refresh_token)
        
        # Ambil access token baru dari refresh token
        new_access = refresh.access_token

        return {
            "access": str(new_access),
            "refresh": str(refresh_token),
        }

    except TokenError:
        raise InvalidToken("Refresh token tidak valid atau sudah kedaluwarsa.")