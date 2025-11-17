from celery import shared_task
from utils.http import post
from utils.logger import log

IMAGE_SERVICE_URL = "http://server-image/api/avatar/"

@shared_task
def generate_default_avatar(public_id):
    data = {
        "public_id": public_id
    }

    status, res = post(IMAGE_SERVICE_URL + "generate-default", data)

    log(f"Generate avatar: {status} | {res}")
    return res