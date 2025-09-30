def mask_email(v: str) -> str:
    try:
        l, d = v.split("@")
        if len(l) <= 2:
            a = l[0] + "*" * (len(l) - 1)
        else:
            a = l[0] + "*" * (len(l) - 2) + l[-1]
        return f"{a}@{d}"
    except Exception:
        return v
    
def mask_phone(v: str) -> str:
    try:
        v = v.replace(" ", "")
        l = len(v)
        if l <= 4:
            return v[0] + "*" * (l - 1)
        f = v[:min(4, l // 2)]
        b = v[-4:]
        a = "*" * (l - len(f) - len(b))
        return f + a + b
    except Exception:
        return v
    
def mask_id_card(v: str) -> str:
    try:
        if len(v) <= 6:
            return v[0] + "*" * (len(v) - 1)
        return v[:4] + "*" * (len(v) - 8) + v[-4:]
    except Exception:
        return v
    
def mask_card_number(v: str) -> str:
    try:
        d = v.replace(" ", "")
        if len(d) == 1:
            return "*"
        return "*" * (len(d) - 4) + d[-4:]
    except Exception:
        return v
    
def mask_bank_account(v: str) -> str:
    try:
        if len(v) <= 4:
            return "*" * len(v)
        return "*" * (len(v) - 4) + v[-4:]
    except Exception:
        return v

def mask_address(v: str) -> str:
    try:
        if len(v) <= 8:
            return v[0] + "*" * (len(v) - 1)
        if "," in v:
            p = v.split(",")
            return p[0] + ", ****" + p[-1].strip()
        return v[:5] + "****" + v[-3:]
    except Exception:
        return v

def mask_birthdate(v: str) -> str:
    try:
        return v[:4] + "-**-**"
    except Exception:
        return v

def mask_name(v: str) -> str:
    try:
        p = v.split(" ")
        a = []
        for w in p:
            if len(w) <= 2:
                a.append(w[0] + "*")
            else:
                a.append(w[0] + "*" * (len(w) - 1))
        return " ".join(a)
    except Exception:
        return v
    
#print(mask_email("budi.santoso@example.com"))  # b********o@example.com
#print(mask_phone("081234567890"))              # 0812****7890
#print(mask_id_card("3275010101010001"))        # 3275********0001
#print(mask_card_number("4111111111111234"))    # ************1234
#print(mask_bank_account("1234567890"))         # ******7890
#print(mask_address("Jl. Merdeka No. 123, Jakarta"))  # Jl. Merdeka No. 123, ****Jakarta
#print(mask_birthdate("1990-08-15"))            # 1990-**-**
#print(mask_name("Budi Santoso"))               # B*** S******