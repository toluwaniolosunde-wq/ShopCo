import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import {
  formatPrice,
  getDiscountPercent,
  getOriginalPrice,
  getShortTitle,
} from '../utils/productHelpers';

export default function ProductCard({ product }) {
  const originalPrice = getOriginalPrice(product);
  const discountPercent = getDiscountPercent(product);

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__image-link">
        <div className="product-card__image-shell">
          <img
            className="product-card__image"
            src={product.image}
            alt={product.title}
            loading="lazy"
          />
        </div>
      </Link>

      <div className="product-card__body">
        <Link to={`/product/${product.id}`} className="product-card__title">
          {getShortTitle(product.title, 4)}
        </Link>

        <RatingStars rating={product.rating?.rate ?? 0} />

        <div className="product-card__pricing">
          <span className="product-card__current-price">{formatPrice(product.price)}</span>
          <span className="product-card__original-price">{formatPrice(originalPrice)}</span>
          <span className="product-card__discount">-{discountPercent}%</span>
        </div>
      </div>
    </article>
  );
}
