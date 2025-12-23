import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";

//Páginas 
import HomePage from "../pages/HomePage";
import BienvenidoPage from "../pages/BienvenidoPage";
import PromocionesPage from "../pages/PromocionesPage"
import CanjesPage from "../pages/CanjesPage"
import MiCuentaPage from "../pages/MiCuentaPage";
import PasosPage from "../pages/PasosPage"
import ProductsPage from "../pages/ProductsPage";


export default function AppRouter() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Grupo de rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/bienvenido" element={<BienvenidoPage />} />
          {/* <Route path="/inicio" element={<HomePage />} /> */}
          <Route path="/promociones" element={<PromocionesPage />} />
          <Route path="/canjes" element={<CanjesPage />} />
          <Route path="/mi-cuenta" element={<MiCuentaPage />} />
          <Route path="/como-funciona" element={<PasosPage />} />
          <Route path="/catalogo" element={<ProductsPage />} />

          {/* Aquí podrías agregar más rutas internas:
              <Route path="/usuarios" element={<UsuariosPage />} />
              <Route path="/reportes" element={<ReportesPage />} />
          */}
        </Route>
      </Route>

      {/* Cualquier otra ruta redirige */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
