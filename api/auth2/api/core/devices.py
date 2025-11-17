from user_agents import parse  # pip install pyyaml ua-parser user-agents
from django.utils import timezone
from authentications.models import UserDevice

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def log_device_login(request, user):
    ip = get_client_ip(request)
    user_agent = parse(request.META.get("HTTP_USER_AGENT", ""))

    device_type = (
        "Mobile" if user_agent.is_mobile else
        "Tablet" if user_agent.is_tablet else
        "PC"
    )

    os = user_agent.os.family
    browser = user_agent.browser.family

    UserDevice.objects.update_or_create(
        user=user,
        ip_address=ip,
        device_type=device_type,
        defaults={
            "operating_system": os,
            "browser": browser,
            "last_login": timezone.now(),
        }
    )
