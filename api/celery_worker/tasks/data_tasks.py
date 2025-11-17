from celery import shared_task
from utils.http import post
from utils.logger import log

DATA_SERVICE_URL = "http://server-data/api/events/"

@shared_task
def user_created_event(public_id, email):
    data = {
        "public_id": public_id,
        "email": email,
        "event": "user_created"
    }

    status, res = post(DATA_SERVICE_URL + "user-created", data)

    log(f"User created event: {status} | {res}")
    return res