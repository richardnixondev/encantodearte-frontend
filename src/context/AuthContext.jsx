import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);           // Dados do usuário logado
  const [loading, setLoading] = useState(true);     // Indica se ainda está verificando o token

  const storedToken = localStorage.getItem("authToken");

  // Verifica o token ao carregar o app
  useEffect(() => {
    if (storedToken) {
      axios
        .get("http://localhost:5005/auth/verify", {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then((res) => {
          // req.payload do backend → user info
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Token inválido ou expirado:", err);
          setUser(null);
          localStorage.removeItem("authToken");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [storedToken]);


  const login = (authToken) => {
    localStorage.setItem("authToken", authToken);
 
    axios
      .get("http://localhost:5005/auth/verify", {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("Erro ao verificar token após login:", err);
        setUser(null);
      });
  };

 
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("cart"); //clear cart when logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
