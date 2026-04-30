import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import NavBar from './NavBar';
import Footer from './Footer';

export default function StoreLayout() {
  const [showBanner, setShowBanner] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="app-shell">
      {showBanner ? (
        <div className="promo-bar">
          <div className="container promo-bar__inner">
            <p>
              Sign up and get 20% off to your first order. <a href="/">Sign Up Now</a>
            </p>
            <button
              type="button"
              className="promo-bar__close"
              onClick={() => setShowBanner(false)}
              aria-label="Close offer banner"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : null}

      <NavBar />
      <main className="page-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
