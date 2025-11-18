from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

def generate_tokens(user):
    refresh = RefreshToken.for_user(user)

    # 🧩 Custom payload (claim) tambahan
    refresh["user_id"] = str(user.id)
    refresh["username"] = user.username
    if user.email:
        refresh["email"] = user.email
    if user.phone:
        refresh["phone"] = user.phone

    # Kamu bisa tambahkan metadata lain jika perlu
    # refresh["roles"] = user.roles if hasattr(user, "roles") else None
    # refresh["is_verified"] = user.verification.email_verified if hasattr(user, "verification") else False

    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }

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
    
