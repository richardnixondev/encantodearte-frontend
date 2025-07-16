import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import "../Navbar.css";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(total);
    };

    updateCartCount(); // inicial
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🧶 Encanto de Arte
      </Link>

      <div className="navbar-links">
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="navbar-icons">
        <Link to="/" className="navbar-icon">
          <FiUser size={22} />
          <span>{user ? user.surname : "Login"}</span>
        </Link>

        <Link to="/cart" className="navbar-icon cart-icon">
          <FiShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
