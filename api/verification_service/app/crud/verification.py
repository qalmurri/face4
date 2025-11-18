from sqlalchemy.orm import Session
from models.verification import VerificationCode
from core.config import settings
from core.utils import generate_otp, current_timestamp

def create_verification(db: Session, user_id: str, purpose: str):
    code = generate_otp()
    verification = VerificationCode(
        user_id=user_id,
        purpose=purpose,
        code=code,
        expires_at=current_timestamp() + settings.OTP_EXPIRATION_SECONDS
    )
    db.add(verification)
    db.commit()
    db.refresh(verification)
    return verification

def validate_verification(db: Session, user_id: str, purpose: str, code: str):
    now = current_timestamp()
    v = db.query(VerificationCode).filter_by(
        user_id=user_id, purpose=purpose, code=code, is_used=False
    ).first()
    if v and v.expires_at > now:
        v.mark_used()
        db.commit()
        return True
    return False
