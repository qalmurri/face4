from core.time.validate import is_not_expired

def is_code_valid(is_used: bool, expires_at: int) -> bool:
    return not is_used and is_not_expired(expires_at)