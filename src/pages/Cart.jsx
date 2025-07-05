import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.product._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(({ product, quantity }) => (
            <div key={product._id}>
              <h2>{product.name}</h2>
              <p>€ {product.price.toFixed(2)} × {quantity}</p>
              <button onClick={() => removeItem(product._id)}>Remove</button>
            </div>
          ))}
          <h3>Total: € {total.toFixed(2)}</h3>
          <button onClick={() => navigate("/checkout")}>Go to Checkout</button>
        </div>
      )}
    </div>
  );
}
