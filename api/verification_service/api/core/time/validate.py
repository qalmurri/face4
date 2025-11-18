def is_expired(expiry_ts, now_ts):
    return now_ts > expiry_ts