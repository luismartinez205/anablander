import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CardContext";
import { useAuth } from "../context/AuthContext";

import {
  FaShoppingCart,
  FaBookReader,
  FaChild,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";
import { BiHomeSmile, BiCustomize } from "react-icons/bi";

function Navbar() {
  const { cart } = useCart();
  const { user,isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);

  

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (e) {
      console.error(e);
    }
  };
  

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">Anablander</Link>
      </div>

      {/* Buscador */}
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="search"
          placeholder="Código o producto..."
        />
      </div>

      {/* Links */}
      <ul className="nav-links">
        <li>
          <Link to="/">
            <BiHomeSmile /> Inicio
          </Link>
        </li>

        <li>
          <Link to="/nosotros">
            <FaChild /> Nosotros
          </Link>
        </li>

        <li>
          <Link to="/catalogo">
            <FaBookReader /> Catálogo
          </Link>
        </li>

        {/* Carrito */}
        <li className="cart">
          <Link to="/cart">
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
            <FaUserCircle size={22} style={{ margin: "3px" }}/>
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
            <Link to="/login">
              <BiCustomize /> Mi Cuenta
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;





