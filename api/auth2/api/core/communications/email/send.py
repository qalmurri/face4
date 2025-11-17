from django.conf import settings
from django.core.mail import send_mail
import logging

def send_email_verification(email: str, code: str):
    """
    Kirim email verifikasi ke user.
    """
    subject = "Verify Your Account"
    message = f"Your verification code is: {code}"
    sender = getattr(settings, "DEFAULT_FROM_EMAIL", "noreply@yourapp.com")

    try:
        send_mail(subject, message, sender, [email])
        logging.info(f"Verification email sent to {email}")
        return True
    except Exception as e:
        logging.error(f"Failed to send email to {email}: {e}")
        return False