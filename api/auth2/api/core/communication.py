import random
import string
import logging
from django.core.mail import send_mail
from django.conf import settings

# Jika nanti kamu integrasi API SMS, tinggal ganti fungsi dummy send_sms() ini
def send_sms(phone: str, message: str):
    """
    Dummy SMS sender — ganti dengan integrasi Twilio, Vonage, atau layanan lokal.
    """
    logging.info(f"Send SMS to {phone}: {message}")
    return True


def generate_verification_code(length: int = 6) -> str:
    """Generate random numeric verification code."""
    return ''.join(random.choices(string.digits, k=length))


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


def send_phone_verification(phone: str, code: str):
    """
    Kirim SMS verifikasi ke user.
    """
    message = f"Your verification code is: {code}"
    try:
        send_sms(phone, message)
        logging.info(f"Verification SMS sent to {phone}")
        return True
    except Exception as e:
        logging.error(f"Failed to send SMS to {phone}: {e}")
        return False


def send_verification(destination_type: str, destination_value: str):
    """
    Abstraksi umum — kirim verifikasi berdasarkan tipe input.
    - destination_type: "email" | "phone"
    - destination_value: alamat email atau nomor HP
    """
    code = generate_verification_code()

    if destination_type == "email":
        success = send_email_verification(destination_value, code)
    elif destination_type == "phone":
        success = send_phone_verification(destination_value, code)
    else:
        logging.warning(f"Unsupported verification type: {destination_type}")
        return None

    if success:
        return code  # biasanya kamu simpan code ini di database sementara (OTP model)
    return None
