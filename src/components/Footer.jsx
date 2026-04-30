import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { footerColumns } from '../data/siteData';

const socialIcons = [
  { id: 'x-icon', label: 'X' },
  { id: 'discord-icon', label: 'Discord' },
  { id: 'github-icon', label: 'GitHub' },
  { id: 'bluesky-icon', label: 'Bluesky' },
];
const paymentBadges = ['VISA', 'MasterCard', 'PayPal', 'Apple Pay', 'G Pay'];

function SpriteIcon({ id, label }) {
  return (
    <svg className="sprite-icon" aria-hidden="true" focusable="false">
      <title>{label}</title>
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer-shell">
      <div className="container">
        <form className="newsletter-banner" onSubmit={(event) => event.preventDefault()}>
          <div className="newsletter-banner__content">
            <h2 className="section-title newsletter-banner__title">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </h2>
          </div>

          <div className="newsletter-banner__form">
            <label className="newsletter-banner__field" htmlFor="newsletter-email">
              <Mail size={18} />
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email address"
              />
            </label>
            <button type="submit" className="button button--light">
              Subscribe to Newsletter
            </button>
          </div>
        </form>

        <div className="site-footer">
          <div className="site-footer__intro">
            <Link className="site-logo site-logo--footer" to="/">
              SHOP.CO
            </Link>
            <p className="site-footer__description">
              We have clothes that suits your style and which you&apos;re proud to wear.
              From women to men.
            </p>

            <div className="site-footer__socials">
              {socialIcons.map((icon) => (
                <button key={icon.id} type="button" className="social-button" aria-label={icon.label}>
                  <SpriteIcon id={icon.id} label={icon.label} />
                </button>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="site-footer__column">
              <h3 className="site-footer__heading">{column.title}</h3>
              <ul className="site-footer__links">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link to="/">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <p>Shop.co © 2000-2025, All Rights Reserved</p>
          <div className="payment-badges">
            {paymentBadges.map((badge) => (
              <span key={badge} className="payment-badge">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
