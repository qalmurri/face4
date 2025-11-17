from celery import Celery

app = Celery("bridge_worker")
app.config_from_object("celeryconfig")

# load semua tasks
app.autodiscover_tasks(['tasks'])