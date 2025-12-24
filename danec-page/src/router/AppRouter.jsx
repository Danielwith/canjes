import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";

//Páginas 
import HomePage from "../pages/HomePage";
import BienvenidoPage from "../pages/BienvenidoPage";
import  MisPuntosPage  from "../pages/MisPuntosPage";
import CanjesPage from "../pages/CanjesPage"
import MiCuentaPage from "../pages/MiCuentaPage";
import PasosPage from "../pages/PasosPage"
import ProductsPage from "../pages/ProductsPage";
import CarritoPage from "../pages/CarritoPage";


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
         
          <Route path="/canjes" element={<CanjesPage />} />
          <Route path="/mi-cuenta" element={<MiCuentaPage />} />
          <Route path="/mis-puntos" element={<MisPuntosPage />} />
          <Route path="/como-funciona" element={<PasosPage />} />
          <Route path="/catalogo" element={<ProductsPage />} />
          <Route path="/carrito" element={<CarritoPage />} />

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
