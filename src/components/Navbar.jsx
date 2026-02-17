import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CardContext";
import { useAuth } from "../context/AuthContext";

import {
  FaShoppingCart,
  FaBookReader,
  FaChild,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { BiHomeSmile, BiCustomize } from "react-icons/bi";

function Navbar() {
  const { cart } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (e) {
      console.error(e);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">Anablander</Link>
      </div>

      {/* Buscador (desktop) */}
      <div className="search-box search-desktop">
        <FaSearch className="search-icon" />
        <input
          type="search"
          placeholder="Código o producto..."
        />
      </div>

      {/* Hamburger button */}
      <button
        className="hamburger-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Links */}
      <ul className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        {/* Mobile search */}
        <li className="search-mobile">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="search"
              placeholder="Código o producto..."
            />
          </div>
        </li>

        <li>
          <Link to="/" onClick={closeMenu}>
            <BiHomeSmile /> Inicio
          </Link>
        </li>

        <li>
          <Link to="/nosotros" onClick={closeMenu}>
            <FaChild /> Nosotros
          </Link>
        </li>

        <li>
          <Link to="/catalogo" onClick={closeMenu}>
            <FaBookReader /> Catálogo
          </Link>
        </li>

        {/* Carrito */}
        <li className="cart">
          <Link to="/cart" onClick={closeMenu}>
            <button type="button">
              <FaShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="badge-mail">{totalItems}</span>
              )}
            </button>
          </Link>
        </li>

        {/* Usuario */}
        <li className="user-area">
          {user ? (
            <div className="user-logged">
              <FaUserCircle size={22} style={{ margin: "3px" }} />
              <span className="user-email">
                {user.email}
              </span>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              <BiCustomize /> Mi Cuenta
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
