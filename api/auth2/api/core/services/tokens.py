from rest_framework_simplejwt.tokens import RefreshToken

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