from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None and response.status_code == 400:
        errors = {}
        for field, messages in response.data.items():
            for field, messages in response.data.items():
                errors[field] = messages[0] if isinstance(messages,list) else messages
        response.data = {"errors": errors}

    return response