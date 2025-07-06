import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import "/src/Navbar.css";

export default function Navbar() {
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
        <Link to="/profile">
          <FiUser size={22} />
        </Link>
        <Link to="/cart">
          <FiShoppingCart size={22} />
        </Link>
      </div>
    </nav>
  );
}
