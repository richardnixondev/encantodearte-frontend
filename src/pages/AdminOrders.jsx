import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${apiUrl}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setOrders(res.data))
      .catch(() => alert("Somente administradores podem acessar isto"));
  }, []);

  const updateStatus = (orderId, status) => {
    const token = localStorage.getItem("token");
    axios.put(`${apiUrl}/orders/${orderId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert("Status updated");
        window.location.reload();
      })
      .catch(() => alert("Falha ao atualizar o status"));
  };

  return (
    <div>
      <h1>Admin: All Orders</h1>
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <p><strong>Order by:</strong> {order.user?.email || "Unknown"}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> € {order.totalAmount.toFixed(2)}</p>

          <select onChange={(e) => updateStatus(order._id, e.target.value)} value={order.status}>
            <option value="pending">pending</option>
            <option value="paid">paid</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
}
