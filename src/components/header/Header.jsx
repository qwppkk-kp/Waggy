import "./header.scss";
import { FaHeart, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { NavLink, useLocation } from 'react-router-dom';

const Header = ({ 
  filterText, 
  setFilterText,
  cartCount = 0,
  wishlistCount = 0
}) => {
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  return (
    <header className="header">
      <div className="container">
        <div className="header__top">
          <div className="header__logo">
            <NavLink to="/">
              <img src="/img/logo.svg" alt="Waggy Pet Shop" className="header__logo-icon" />
            </NavLink>
          </div>
          
          <div className="header__search">
            <div className="header__search-wrapper">
              <input
                type="text"
                placeholder="Search for more than 10,000 products"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="header__search-input"
              />
              <FaSearch className="header__search-icon" />
            </div>
          </div>
          
          <div className="header__contacts">
            <div className="header__contact">
              <span className="header__contact-label">Phone</span>
              <span className="header__contact-value">+980-34-984089</span>
            </div>
            <div className="header__contact">
              <span className="header__contact-label">Email</span>
              <span className="header__contact-value">waggy@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="header__top-separator"></div>

      <div className="container">
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "header__nav-link active" : "header__nav-link"}
              >
                Home
              </NavLink>
            </li>
            <li><a href="/page" className="header__nav-link">Page</a></li>
            <li><a href="/shop" className="header__nav-link">Shop</a></li>
            <li><a href="/blog" className="header__nav-link">Blog</a></li>
            <li><a href="/contact" className="header__nav-link">Contact</a></li>
            <li><a href="/offers" className="header__nav-link">Offers</a></li>
            
            <li className="header__nav-icons">
              {/* Иконка пользователя — просто ссылка, без активного состояния */}
              <a href="#" className="header__nav-icon-link">
                <FaUser className="header__nav-icon" />
              </a>
              <NavLink 
                to="/wishlist" 
                className={({ isActive }) => isActive ? "header__nav-icon-link active" : "header__nav-icon-link"}
              >
                <FaHeart className="header__nav-icon" />
                {wishlistCount > 0 && (
                  <span className="header__nav-icon-badge">{wishlistCount}</span>
                )}
              </NavLink>
              <NavLink 
                to="/cart" 
                className={({ isActive }) => isActive ? "header__nav-icon-link active" : "header__nav-icon-link"}
                style={{ visibility: isCartPage ? 'hidden' : 'visible' }}
              >
                <FaShoppingCart className="header__nav-icon" />
                {cartCount > 0 && (
                  <span className="header__nav-icon-badge">{cartCount}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;