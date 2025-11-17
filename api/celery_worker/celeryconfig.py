broker_url = "redis://127.0.0.1:6379/0"
result_backend = "redis://127.0.0.1:6379/1"

task_serializer = "json"
result_serializer = "json"
accept_content = ["json"]

task_default_queue = "default"

worker_concurrency = 4