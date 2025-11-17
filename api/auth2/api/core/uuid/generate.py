from uuid import uuid4

def generate_uuid4():
    return uuid4()

def generate_uuid4_6int():
    return f"{uuid4().int % 1_000_000:06d}"