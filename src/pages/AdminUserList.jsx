import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AdminUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios.get(`${apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      console.error("Erro ao buscar usuários:", err);
    });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Lista de Usuários</h2>
      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <strong>{user.name}</strong> — {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
