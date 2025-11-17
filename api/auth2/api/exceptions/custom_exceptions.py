from .base_exceptions import BaseAppException

class BadRequestException(BaseAppException):
    status_code = 400
    default_message = "Bad Request"

class UnauthorizedException(BaseAppException):
    status_code = 401
    default_message = "Unauthorized"

class ForbiddenException(BaseAppException):
    status_code = 403
    default_message = "Forbidden"

class NotFoundException(BaseAppException):
    status_code = 404
    default_message = "Resource not found"

class ConflictException(BaseAppException):
    status_code = 409
    default_message = "Conflict"

class ServerErrorException(BaseAppException):
    status_code = 500
    default_message = "Internal server error"
