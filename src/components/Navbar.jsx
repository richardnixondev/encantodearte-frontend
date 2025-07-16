import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import "/src/Navbar.css";

export default function Navbar() {
  const { user } = useContext(AuthContext);

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
        <Link to={user ? "/profile" : "/login"} className="navbar-icon">
          <FiUser size={22} />
          <span>{user ? user.surname : "Login"}</span>
        </Link>

        <Link to="/cart" className="navbar-icon">
          <FiShoppingCart size={22} />
        </Link>
      </div>
    </nav>
  );
}
