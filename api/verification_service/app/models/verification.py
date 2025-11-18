import uuid
from sqlalchemy import Column, String, Boolean, Integer
from sqlalchemy.dialects.postgresql import UUID
from db.base import Base
from datetime import datetime

class VerificationCode(Base):
    __tablename__ = "verification_codes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, index=True)
    code = Column(String(10))
    purpose = Column(String(50))
    is_used = Column(Boolean, default=False)
    created_at = Column(Integer, default=lambda: int(datetime.utcnow().timestamp()))
    expires_at = Column(Integer)

    def mark_used(self):
        self.is_used = True
