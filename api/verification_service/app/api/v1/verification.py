from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.verification import VerificationCreate, VerificationCheck
from services.otp_service import OTPService
from db.session import get_db

router = APIRouter(prefix="/v1/verification")

@router.post("/create")
def create_code(request: VerificationCreate, db: Session = Depends(get_db)):
    verification = OTPService.generate_otp(db, request.user_id, request.purpose)
    return {"user_id": verification.user_id, "code": verification.code, "expires_at": verification.expires_at}

@router.post("/verify")
def verify_code(request: VerificationCheck, db: Session = Depends(get_db)):
    valid = OTPService.check_otp(db, request.user_id, request.purpose, request.code)
    return {"verified": valid}
