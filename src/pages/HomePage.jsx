import { useRef } from 'react';
import ProductCard from '../components/ProductCard';
import ReviewCard from '../components/ReviewCard';
import {
  brandLogos,
  dressStyles,
  heroImage,
  heroStats,
  testimonials,
} from '../data/siteData';
import { useGetProductsQuery } from '../features/api/storeApi';
import { getNewArrivals, getTopSelling } from '../utils/productHelpers';

export default function HomePage() {
  const testimonialsRef = useRef(null);
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  const newArrivals = getNewArrivals(products);
  const topSelling = getTopSelling(products);

  const scrollTestimonials = (direction) => {
    testimonialsRef.current?.scrollBy({
      left: direction * 320,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return (
      <section className="status-panel">
        <div className="container">
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="status-panel">
        <div className="container">
          <p>We couldn&apos;t load the Fake Store products right now. Please try again.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="hero-section">
        <div className="container hero">
          <div className="hero__content">
            <h1 className="hero__title">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
            <p className="hero__copy">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense of style.
            </p>

            <a className="button button--dark hero__button" href="#new-arrivals">
              Shop Now
            </a>

            <div className="hero__stats">
              {heroStats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__media">
            <span className="hero__spark hero__spark--large">✦</span>
            <span className="hero__spark hero__spark--small">✦</span>
            <img src={heroImage} alt="Fashion models posing in modern outfits" />
          </div>
        </div>
      </section>

      <section className="brand-strip" id="brands">
        <div className="container brand-strip__inner">
          {brandLogos.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>
      </section>

      <section className="product-section container" id="new-arrivals">
        <div className="section-heading">
          <h2 className="section-title">NEW ARRIVALS</h2>
        </div>

        <div className="product-grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="section-footer">
          <button type="button" className="button button--ghost">
            View All
          </button>
        </div>
      </section>

      <section className="product-section container product-section--border" id="top-selling">
        <div className="section-heading">
          <h2 className="section-title">TOP SELLING</h2>
        </div>

        <div className="product-grid">
          {topSelling.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="section-footer">
          <button type="button" className="button button--ghost">
            View All
          </button>
        </div>
      </section>

      <section className="container style-browser-shell">
        <div className="style-browser">
          <div className="section-heading">
            <h2 className="section-title">BROWSE BY DRESS STYLE</h2>
          </div>

          <div className="style-browser__grid">
            {dressStyles.map((style) => (
              <article
                key={style.title}
                className="style-card"
                style={{ backgroundImage: `url(${style.image})` }}
                data-span={style.span}
              >
                <h3>{style.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container testimonials-section">
        <div className="section-heading section-heading--between">
          <h2 className="section-title">OUR HAPPY CUSTOMERS</h2>
          <div className="testimonial-controls">
            <button type="button" onClick={() => scrollTestimonials(-1)}>
              ←
            </button>
            <button type="button" onClick={() => scrollTestimonials(1)}>
              →
            </button>
          </div>
        </div>

        <div className="testimonials-track" ref={testimonialsRef}>
          {testimonials.map((review) => (
            <ReviewCard key={review.name} review={review} className="testimonial-card"/>
          ))}
        </div>
      </section>
    </>
  );
}
