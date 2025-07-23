import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../AuthForm.css";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o reload da página

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password
      });

      const token = response.data.authToken;

      login(token);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
      console.error("Login failed", err);
    }
  };

  return (
    <div className="auth-form-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      <p className="signup-link">
        Ainda não tem uma conta? <Link to="/signup">Crie aqui</Link>
      </p>
    </div>
  );
}
