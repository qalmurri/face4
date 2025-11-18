import logging

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

# Jika nanti kamu integrasi API SMS, tinggal ganti fungsi dummy send_sms() ini
def send_sms(phone: str, message: str):
    """
    Dummy SMS sender — ganti dengan integrasi Twilio, Vonage, atau layanan lokal.
    """
    logging.info(f"Send SMS to {phone}: {message}")
    return True
