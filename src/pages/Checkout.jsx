import { useState } from "react";
import axios from "axios";

export default function Checkout() {
  const [form, setForm] = useState({
    fullName: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    zipcode: "",
    country: "Brasil",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const token = localStorage.getItem("token");

    if (!token) return alert("You must be logged in!");

    const payload = {
      items: cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      shippingAddress: form,
      totalAmount: cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    };

    axios.post("http://localhost:5005/orders", payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      alert("Order placed!");
      localStorage.removeItem("cart");
    })
    .catch((err) => {
      console.error("Error placing order:", err);
      alert("Something went wrong.");
    });
  };

  return (
    <div>
      <h1>Checkout</h1>
      <input name="fullName" placeholder="Full name" onChange={handleChange} />
      <input name="street" placeholder="Street" onChange={handleChange} />
      <input name="number" placeholder="Number" onChange={handleChange} />
      <input name="complement" placeholder="Complement" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <input name="state" placeholder="State" onChange={handleChange} />
      <input name="zipcode" placeholder="ZIP Code" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <button onClick={handleSubmit}>Submit Order</button>
    </div>
  );
}
