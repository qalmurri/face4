class BaseAppException(Exception):
    """
    Base exception for all custom application exceptions.
    Includes a default message and HTTP status code.
    """
    status_code = 400
    default_message = "Application error"

    def __init__(self, message=None, status_code=None, extra=None):
        """
        extra: additional data to send to the client in the response.
        """
        self.message = message or self.default_message
        self.status_code = status_code or self.status_code
        self.extra = extra or {}
        super().__init__(self.message)
