
//No se está uasando de momento, pero servía para proteger las rutas, que si el usuario no actulizo sus datos no pueda acceder a otros rutas
//que no sea mi-cuenta
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfileUpdatedGuard() {
  const { loading, needsProfileUpdate } = useAuth();
  const location = useLocation();




  if (loading) {
    return <div className="min-h-screen grid place-items-center">Cargando...</div>;
  }

  const isInMyAccount = location.pathname.startsWith("/mi-cuenta");

  if (needsProfileUpdate && !isInMyAccount) {
    return <Navigate to="/mi-cuenta" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
