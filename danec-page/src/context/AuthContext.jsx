import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { loginApi, getProfileApi } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validar token al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const me = await getProfileApi();
        setUser(me);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // La comento hasta que esté el back listo
  // const login = async (username, password) => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const { token, user } = await loginApi({
  //       username,
  //       password,
  //     });

  //     localStorage.setItem("token", token);
  //     setUser(user);
  //     return true;
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.response?.data?.message || "Credenciales inválidas");
  //     return false;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //Credenciales de prueba
  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    const MOCK_USER = {
      username: "admin",
      name: "Administrador",
      role: "ADMIN",
      fullname: "Anderson Espinoza",
      puntos_ultima_carga: 2000,
      compras: [
        {
          codigoCliente: "9177717",
          participante: "JINSOP KELVIN",
          mes: "Septiembre",
          fecha: "2025-09-10",
          compra: 0,
          puntos: 0,
        },
        {
          codigoCliente: "9177717",
          participante: "JINSOP KELVIN",
          mes: "Octubre",
          fecha: "2025-10-05",
          compra: 150,
          puntos: 300,
        },
      ],
    };

    const MOCK_PASSWORD = "123456";
    const MOCK_TOKEN = "mock-token-123";

    // Simula llamada async
    await new Promise((res) => setTimeout(res, 500));

    if (username === MOCK_USER.username && password === MOCK_PASSWORD) {
      localStorage.setItem("token", MOCK_TOKEN);
      setUser(MOCK_USER);
      setLoading(false);
      return true;
    }

    setError("Usuario o contraseña incorrectos");
    setLoading(false);
    return false;
  };


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const compras = user?.compras || [];

  const resumenMensual = useMemo(() => {
    return compras.reduce((acc, item) => {
      acc[item.mes] = (acc[item.mes] || 0) + item.puntos;
      return acc;
    }, {});
  }, [compras]);

  const totalPuntos = useMemo(
    () => Object.values(resumenMensual).reduce((a, b) => a + b, 0),
    [resumenMensual]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        compras,
        resumenMensual,
        totalPuntos,
        isAuthenticated: !!user,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return ctx;
}
