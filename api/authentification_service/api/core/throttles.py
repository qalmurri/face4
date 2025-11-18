from rest_framework.throttling import UserRateThrottle, AnonRateThrottle, SimpleRateThrottle
from rest_framework.exceptions import Throttled

class RegisterThrottle(AnonRateThrottle):
    scope = "register"

class LoginThrottle(AnonRateThrottle):
    scope = "login"

class AuthenticatedUserThrottle(UserRateThrottle):
    scope = "user"

# class IPThrottle(SimpleRateThrottle):
#     scope = "ip"
#     def get_cache_key(self, request, view):
#        ip = request.META.get("REMOTE_ADDR")
#        return self.cache_format % {'scope': self.scope, 'ident': ip}
#     
# class HybridThrottle(SimpleRateThrottle):
#     scope = "hybrid"
#     def get_cache_key(self, request, view):
#         ident = request.user.id if request.user.is_authenticated else self.get_ident(request)
#         return self.cache_format % {'scope': self.scope, 'ident': ident}
# 
# class VerboseLoginThrottle(AnonRateThrottle):
#     scope = "login"
#     def throttle_failure(self):
#         # Bisa tulis ke log / audit
#         print(f"Login throttle triggered for IP {self.get_ident(self.request)}")
#         raise Throttled(detail={
#             "error": "Too many login attempts. Try again later."
#         })