from pydantic import BaseModel

class VerificationCreate(BaseModel):
    user_id: str
    purpose: str

class VerificationCheck(BaseModel):
    user_id: str
    purpose: str
    code: str
