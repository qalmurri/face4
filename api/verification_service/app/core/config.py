import os

class Settings:
    DB_URL = os.getenv("DB_URL", "sqlite:///./verification.db")
    OTP_EXPIRATION_SECONDS = int(os.getenv("OTP_EXPIRATION_SECONDS", 300))
    AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://localhost:8000")

settings = Settings()
