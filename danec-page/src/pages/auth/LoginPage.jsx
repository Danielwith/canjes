// src/pages/auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/AuthLayout";
import logoHome from "../../assets/logo-home.png";
import { Eye, EyeOff } from 'lucide-react';
import logo from "../../assets/logo-white.png";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(form.username, form.password);
    if (ok) navigate("/bienvenido");
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col items-center lg:items-end lg:w-full p-4 pb-0 max-w-lg mx-auto lg:mx-0">
        
        {/* Logo */}
        <div className="w-full flex justify-center mb-4">
          <img src={logo} alt="Programa Experto Danec" className="w-[280px] md:w-[320px] object-contain" />
        </div>

        {/* Cuadro Blanco de Login */}
        <div className="w-full bg-white p-10 md:p-12 rounded-[2.5rem] rounded-b-none shadow-2xl flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#f70030] text-center mb-2 tracking-tight">
            ¡Bienvenido!
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Usuario */}
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="username" className="text-gray-600 font-semibold text-sm ml-1">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Ingresa tu usuario"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-50 transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-1.5 text-left relative">
              <label htmlFor="password" className="text-gray-600 font-semibold text-sm ml-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-50 transition-all placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center font-medium -mt-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f70030] text-white py-3.5 rounded-full text-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all mt-2"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <div className="flex flex-col items-center mt-2">
            <a href="#" className="text-gray-800 font-bold hover:text-black text-sm md:text-base mb-10">
              ¿Olvidaste tu contraseña?
            </a>

            <a 
              className="cursor-pointer flex items-center gap-2" 
              target="_blank" 
              href="https://grupodanec.com.ec/danec-linea-experto/"
            >
              <span className="text-[10px] uppercase tracking-wider text-gray-800 font-bold">volver a</span>
              <img src={logoHome} alt="Danec Línea Experto" className="h-10 md:h-12 object-contain" />
            </a>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
