import logging

logger = logging.getLogger(__name__)


class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        logger.info(f"Incoming request: {request.method} {request.path}")
        logger.info(f"Request Headers: {request.headers}")
        logger.info(f"Request Body: {request.body}")
        logger.debug(f"Request GET Parameters: {request.GET}")
        logger.debug(f"Request POST Parameters: {request.POST}")
        response = self.get_response(request)
        return response
