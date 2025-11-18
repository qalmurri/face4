from crud.verification import create_verification, validate_verification
from sqlalchemy.orm import Session

class OTPService:
    @staticmethod
    def generate_otp(db: Session, user_id: str, purpose: str):
        verification = create_verification(db, user_id, purpose)
        # TODO: kirim email/SMS async
        return verification

    @staticmethod
    def check_otp(db: Session, user_id: str, purpose: str, code: str):
        return validate_verification(db, user_id, purpose, code)
