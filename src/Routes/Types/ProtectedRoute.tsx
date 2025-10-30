import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyToken } from "../../Services/APIs/Utilities/VerifyToken";
import { useStatus } from "../../Contexts/StatusContext";

export default function ProtectedRoute() {
  const { isAuthenticated, logout } = useStatus();
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("access_token");

      // Tidak ada token → anggap tidak auth
      if (!token) {
        logout();
        setTokenChecked(true);
        return;
      }

      // ✅ Verify token ke Auth Server
      const valid = await verifyToken(token);

      if (!valid) {
        logout(); // hapus token & set isAuthenticated = false
      }

      setTokenChecked(true);
    };

    checkToken();
  }, [logout]);

  // ⏳ Tunggu verifikasi token dulu
  if (!tokenChecked) {
    return <div className="text-center p-6">Checking Authentication...</div>;
  }

  // ❌ Jika context bilang tidak auth atau token tidak valid → redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Jika lolos semua → render halaman yang dilindungi
  return <Outlet />;
}
