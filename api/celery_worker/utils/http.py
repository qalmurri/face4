import requests

def post(url: str, data: dict):
    try:
        res = requests.post(url, json=data, timeout=5)
        return res.status_code, res.json() if res.content else None
    except Exception as e:
        return 500, {"error": str(e)}