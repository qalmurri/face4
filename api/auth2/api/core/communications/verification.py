import logging
from core.uuid.generate import generate_uuid4_6int
from .email.send import send_email_verification
from .phone.send import send_phone_verification

def send_verification(destination_type: str, destination_value: str):
    code = generate_uuid4_6int()

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
