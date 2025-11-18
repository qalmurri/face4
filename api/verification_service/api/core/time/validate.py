from .timestamps import current_timestamp
def is_not_expired(expires_at: int) -> bool:
    return current_timestamp() < expires_at

def is_expired(expiry_ts, now_ts):
    return now_ts > expiry_ts

def calculate_expiry_time(ttl_minutes: int):
    return current_timestamp() + (ttl_minutes * 60)