from rest_framework.permissions import BasePermission, SAFE_METHODS

class DenyAuthenticated(BasePermission):
    """
    Hanya untuk user yang belum login (anon)
    Dipakai di: register, login
    """
    def has_permission(self, request, view):
        return not request.user or request.user.is_anonymous


class IsEmailVerified(BasePermission):
    """
    Mengizinkan akses hanya jika user sudah verifikasi email
    """
    message = "Email belum diverifikasi."

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_verified


class IsOwner(BasePermission):
    """
    Hanya pemilik object yang boleh akses
    Dipakai di: endpoint user profile, notes milik user, dsb
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsAdminOrReadOnly(BasePermission):
    """
    Admin full akses, user biasa hanya read
    Dipakai di: admin-manage resource
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_staff
