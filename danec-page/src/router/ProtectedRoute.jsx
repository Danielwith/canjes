import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ redirectTo = "/login" }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen grid place-items-center">Cargando...</div>;
  }

  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
}
