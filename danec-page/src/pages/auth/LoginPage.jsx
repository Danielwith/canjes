// src/pages/auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/AuthLayout";
import logo from "../../assets/logo-white.png";
import logoHome from "../../assets/logo-home.png";
import { ChevronDown } from 'lucide-react';

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ahora enviamos username y password
    const ok = await login(form.username, form.password);
    if (ok) navigate("/bienvenido");
  };

  return (
    <AuthLayout title="¡Bienvenido!">
      <div className="w-full rounded-xl shadow-xl flex flex-col gap-5 items-end lg:w-full p-4 max-w-md">


        {/* Logo */}
        <div className="w-full flex justify-center">
          <img src={logo} alt="Logo" className="w-64" />
        </div>

        {/* Formulario */}
        <div className="w-full bg-white p-7 rounded-3xl shadow-lg text-center">
          <form onSubmit={handleSubmit} className="w-full">
            <h1 className="text-4xl font-bold text-black mb-6">
              ¡Bienvenido!
            </h1>

            {/* Usuario */}
            <div className="mb-4">
              <label htmlFor="username" className="hidden">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Usuario"
                value={form.username}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl"
              />
            </div>

            {/* Contraseña */}
            <div className="mb-4">
              <label htmlFor="password" className="hidden">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl"
              />
            </div>

            {error && (
              <p className="text-red-500 mb-3 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-main text-white py-2 rounded-3xl hover:opacity-90 transition"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
        <a className="cursor-pointer w-full justify-center items-center flex flex-col gap-2" target="_blank" href="https://grupodanec.com.ec/danec-linea-experto/">
          <span className="text-sm text-white flex items-center gap-1">Click aquí  <ChevronDown size={20} className="text-white" /></span>
          <div className="w-48 flex justify-center items-center">
            <img src={logoHome} alt="" />
          </div>
        </a>


      </div>
    </AuthLayout>
  );
}
