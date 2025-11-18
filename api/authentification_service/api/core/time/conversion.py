from django.utils import timezone
from datetime import datetime

def timestamp_to_datetime(timestamp: int):
    return timezone.datetime.fromtimestamp(
        timestamp,
        timezone.get_current_timezone()
    )

def datetime_to_timestamp(datetime: datetime) -> int:
    return int(
        datetime.timestamp()
    )