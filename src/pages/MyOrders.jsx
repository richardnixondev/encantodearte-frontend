import { useEffect, useState } from "react";
import axios from "axios";


const apiUrl = import.meta.env.VITE_API_URL;

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get(`${apiUrl}/orders/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setOrders(res.data))
      .catch(() => alert("Failed to load orders"));
  }, []);

  return (
    <div>
      <h1>My Orders</h1>
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> € {order.totalAmount.toFixed(2)}</p>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>
                {item.quantity} × {item.product}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
