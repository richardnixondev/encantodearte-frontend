import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);  // <- use login do contexto
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5005/auth/login", {
        email,
        password
      });

      const token = response.data.authToken;

      login(token); // <- chama a função do contexto que seta o usuário
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
      console.error("Login failed", err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
