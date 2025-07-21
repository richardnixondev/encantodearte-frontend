import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Cart.css";

const apiUrl = import.meta.env.VITE_API_URL;

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

  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
     if (item.product._id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
     }
      return item;
   });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };



  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Seu Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(({ product, quantity }) => (
            <div className="cart-item" key={product._id}>
              <img
                src={`${apiUrl}${product.imageUrl}`}
                alt={product.name}
                className="product-image"
              />
              <div className="item-info">
                <h2>{product.name}</h2>
                <p>
                    R$ {product.price.toFixed(2)} × {quantity}
                    <button onClick={() => updateQuantity(product._id, -1)}>-</button>
                    <button onClick={() => updateQuantity(product._id, 1)}>+</button>
                </p>
              </div>
              <button
                className="remove-button"
                onClick={() => removeItem(product._id)}
              >
                Remover
              </button>
            </div>
          ))}
          <h3>Total: R$ {total.toFixed(2)}</h3>
          <button className="checkout-button" onClick={() => navigate("/checkout")}>
            Finalizar Ordem de Compra
          </button>
        </>
      )}
    </div>
  );
}
