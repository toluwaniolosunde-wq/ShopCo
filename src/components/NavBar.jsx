import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { navigationLinks } from '../data/siteData';
import { selectCartCount } from '../features/cart/cartSlice';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <button
          type="button"
          className="icon-button site-header__menu-button"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link className="site-logo" to="/">
          SHOP.CO
        </Link>

        <nav className="site-nav">
          {navigationLinks.map((link) => (
            <a key={link.label} className="site-nav__link" href={link.href}>
              <span>{link.label}</span>
              {link.hasChevron ? <ChevronDown size={15} /> : null}
            </a>
          ))}
        </nav>

        <label className="site-search" htmlFor="header-search">
          <Search size={18} />
          <input id="header-search" type="search" placeholder="Search for products..." />
        </label>

        <div className="site-actions">
          <button type="button" className="icon-button site-actions__mobile-search">
            <Search size={20} />
          </button>

          <Link to="/cart" className="icon-button" aria-label="Open cart">
            <ShoppingCart size={20} />
            {cartCount > 0 ? <span className="cart-count">{cartCount}</span> : null}
          </Link>

          <button type="button" className="icon-button">
            <User size={20} />
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="mobile-nav">
          <nav className="mobile-nav__links">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                className="mobile-nav__link"
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
