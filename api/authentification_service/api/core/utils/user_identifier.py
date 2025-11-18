def detect_identifier_type(identifier: str):
    if "@" in identifier:
        return "email"
    return "phone"
