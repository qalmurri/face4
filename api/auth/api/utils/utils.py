def log_user_action(request, user, action):
    from ..users.models import UserActionLog

    ip = get_client_ip(request)
    user_agent = request.META.get("HTTP_USER_AGENT", "")

    UserActionLog.objects.create(
        user=user,
        action=action,
        ip_address=ip,
        user_agent=user_agent
    )

def get_client_ip(request):
    """Ambil IP client (X-Forwarded-For kalau ada proxy)."""
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0]
    return request.META.get("REMOTE_ADDR")

def mask_email(email: str) -> str:
    try:
        local, domain = email.split("@")
        if len(local) <= 2:
            masked_local = local[0] + "*" * (len(local) - 1)
        else:
            masked_local = local[0] + "*" * (len(local) - 2) + local[-1]
        return f"{masked_local}@{domain}"
    except Exception:
        return email