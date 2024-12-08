import logo from "/assets/logo.jpg";
import { Link } from "react-router-dom";
import "./Header.css";
import { MdShoppingCart } from "react-icons/md";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <h2 className="welcome-message">Hi Arun</h2>
        <nav className="nav-links">
          <Link to="/cart" className="cart-link">
            <MdShoppingCart size={24} />
            <span className="cart-count">0</span>
          </Link>
          <button className="logout-button">Logout</button>
        </nav>
      </div>
    </header>
  );
};
