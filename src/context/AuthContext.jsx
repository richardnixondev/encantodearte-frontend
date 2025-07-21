import { createContext, useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função reutilizável para verificar o token
  const verifyToken = async (token) => {
    return axios.get(`${apiUrl}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      verifyToken(token)
        .then((res) => {
          if (res.data && typeof res.data === "object") {
            setUser(res.data);
          } else {
            console.warn("Resposta inesperada:", res.data);
            setUser(null);
          }
        })
        .catch((err) => {
          console.error("Token inválido ou expirado:", err);
          setUser(null);
          localStorage.removeItem("authToken");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (authToken) => {
    localStorage.setItem("authToken", authToken);

    verifyToken(authToken)
      .then((res) => {
        if (res.data && typeof res.data === "object") {
          setUser(res.data);
        } else {
          console.warn("Resposta inesperada após login:", res.data);
          setUser(null);
        }
      })
      .catch((err) => {
        console.error("Erro ao verificar token após login:", err);
        setUser(null);
        localStorage.removeItem("authToken");
      });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("cart");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
