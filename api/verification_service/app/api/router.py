from fastapi import APIRouter
from api.v1 import verification

router = APIRouter()
router.include_router(verification.router)
