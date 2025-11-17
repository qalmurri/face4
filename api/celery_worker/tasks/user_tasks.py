from celery import shared_task
from utils.http import post
from utils.logger import log

USER_SERVICE_URL = "http://server-user/api/users/"

@shared_task
def create_user_profile(public_id, email, username):
    data = {
        "public_id": public_id,
        "email": email,
        "username": username,
    }

    status, res = post(USER_SERVICE_URL + "create", data)

    log(f"Create profile: {status} | {res}")
    return res