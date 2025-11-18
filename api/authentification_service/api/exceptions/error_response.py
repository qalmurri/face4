from rest_framework.response import Response
from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    """
    Called for ALL exceptions in DRF.

    Handles custom and DRF exceptions,
    and returns consistent JSON responses.
    """
    from .base_exceptions import BaseAppException

    # Handle custom app exceptions
    if isinstance(exc, BaseAppException):
        return Response({
            "success": False,
            "error": {
                "type": exc.__class__.__name__,
                "message": exc.message,
                "extra": exc.extra
            }
        }, status=exc.status_code)

    # Fallback to default DRF exception handler
    response = exception_handler(exc, context)

    if response is not None:
        # Format DRF errors to match our style
        return Response({
            "success": False,
            "error": {
                "type": exc.__class__.__name__,
                "message": response.data,
            }
        }, status=response.status_code)

    # Handle unknown server errors
    return Response({
        "success": False,
        "error": {
            "type": "ServerError",
            "message": str(exc)
        }
    }, status=500)
