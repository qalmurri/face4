from .timestamps import current_timestamp

def is_not_expired(expires_at: int) -> bool:
    """
    Return True jika waktu sekarang belum melewati expires_at.
    """
    return current_timestamp() < expires_at

def is_expired(expires_at: int) -> bool:
    """
    Return True jika sudah kadaluarsa.
    """
    return current_timestamp() >= expires_at