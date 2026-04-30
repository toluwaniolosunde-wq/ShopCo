import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Minus, Plus, SlidersHorizontal } from 'lucide-react';
import { useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import RatingStars from '../components/RatingStars';
import ReviewCard from '../components/ReviewCard';
import { detailReviews, productSizes } from '../data/siteData';
import { useGetProductQuery, useGetProductsQuery } from '../features/api/storeApi';
import { addToCart } from '../features/cart/cartSlice';
import {
  formatPrice,
  getCategoryLabel,
  getColorOptions,
  getDiscountPercent,
  getGalleryImages,
  getOriginalPrice,
  getRelatedProducts,
  getShortTitle,
} from '../utils/productHelpers';

export default function ProductPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, isError } = useGetProductQuery(productId);
  const { data: products = [] } = useGetProductsQuery();

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) {
      return;
    }

    const initialColors = getColorOptions(product.category);

    setSelectedImage(product.image);
    setSelectedThumbnailIndex(0);
    setSelectedColor(initialColors[0]);
    setSelectedSize('Large');
    setQuantity(1);
  }, [product]);

  if (isLoading) {
    return (
      <section className="status-panel">
        <div className="container">
          <p>Loading product details...</p>
        </div>
      </section>
    );
  }

  if (isError || !product) {
    return (
      <section className="status-panel">
        <div className="container">
          <p>We couldn&apos;t load this product right now.</p>
        </div>
      </section>
    );
  }

  const galleryImages = getGalleryImages(product);
  const colorOptions = getColorOptions(product.category);
  const originalPrice = getOriginalPrice(product);
  const discountPercent = getDiscountPercent(product);
  const relatedProducts = getRelatedProducts(products, product.id);
  const mainCategory =
    product.category.includes("men's") || product.category.includes("women's")
      ? getCategoryLabel(product.category)
      : 'Shop';

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
        color: selectedColor,
        size: selectedSize,
      }),
    );
  };

  return (
    <>
      <section className="container container--wide product-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <span>Shop</span>
          <span>›</span>
          <span>{mainCategory}</span>
          <span>›</span>
          <span>{getShortTitle(product.title, 2)}</span>
        </nav>

        <div className="product-hero">
          <div className="product-gallery">
            <div className="product-gallery__thumbs">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`product-gallery__thumb ${
                    selectedThumbnailIndex === index ? 'is-active' : ''
                  }`}
                  onClick={() => {
                    setSelectedImage(image);
                    setSelectedThumbnailIndex(index);
                  }}
                >
                  <img src={image} alt={`${product.title} thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className="product-gallery__main">
              <img src={selectedImage || product.image} alt={product.title} />
            </div>
          </div>

          <div className="product-summary">
            <h1 className="section-title product-summary__title">
              {getShortTitle(product.title, 4)}
            </h1>

            <RatingStars rating={product.rating?.rate ?? 0} />

            <div className="product-summary__pricing">
              <span className="product-summary__price">{formatPrice(product.price)}</span>
              <span className="product-summary__original">{formatPrice(originalPrice)}</span>
              <span className="product-summary__discount">-{discountPercent}%</span>
            </div>

            <p className="product-summary__description">{product.description}</p>

            <div className="product-option-group">
              <p className="product-option-group__label">Select Colors</p>
              <div className="color-swatches">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-swatch ${selectedColor === color ? 'is-selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Choose ${color} color`}
                  />
                ))}
              </div>
            </div>

            <div className="product-option-group">
              <p className="product-option-group__label">Choose Size</p>
              <div className="size-options">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-option ${selectedSize === size ? 'is-selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="purchase-row">
              <div className="quantity-selector">
                <button
                  type="button"
                  onClick={() => setQuantity((currentValue) => Math.max(1, currentValue - 1))}
                >
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((currentValue) => currentValue + 1)}>
                  <Plus size={16} />
                </button>
              </div>

              <button type="button" className="button button--dark purchase-row__button" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <button type="button">Product Details</button>
          <button type="button" className="is-active">
            Rating & Reviews
          </button>
          <button type="button">FAQs</button>
        </div>

        <section className="reviews-section">
          <div className="reviews-section__header">
            <h2>All Reviews (451)</h2>
            <div className="reviews-section__actions">
              <button type="button" className="filter-button" aria-label="Filter reviews">
                <SlidersHorizontal size={18} />
              </button>
              <select className="sort-select" defaultValue="Latest" aria-label="Sort reviews">
                <option>Latest</option>
                <option>Highest Rated</option>
                <option>Lowest Rated</option>
              </select>
              <button type="button" className="button button--dark reviews-section__cta">
                Write a Review
              </button>
            </div>
          </div>

          <div className="reviews-grid">
            {detailReviews.map((review, index) => (
              <ReviewCard
                key={review.name}
                review={review}
                className={index > 2 ? 'review-card--desktop-only' : ''}
              />
            ))}
          </div>

          <div className="section-footer">
            <button type="button" className="button button--ghost">
              Load More Reviews
            </button>
          </div>
        </section>
      </section>

      <section className="container container--wide product-section related-products">
        <div className="section-heading">
          <h2 className="section-title">YOU MIGHT ALSO LIKE</h2>
        </div>

        <div className="product-grid">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </>
  );
}
