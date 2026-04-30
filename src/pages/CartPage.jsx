import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, Tag, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from '../features/api/storeApi';
import {
  decrementCartItem,
  incrementCartItem,
  initializeCart,
  removeCartItem,
  selectCartDiscount,
  selectCartHydrated,
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
  selectDeliveryFee,
} from '../features/cart/cartSlice';
import { buildStarterCartItems, formatMoney } from '../utils/cartHelpers';
import { getShortTitle } from '../utils/productHelpers';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const hasHydrated = useSelector(selectCartHydrated);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectCartDiscount);
  const deliveryFee = useSelector(selectDeliveryFee);
  const total = useSelector(selectCartTotal);
  const { data: products = [], isLoading } = useGetProductsQuery();

  useEffect(() => {
    if (hasHydrated || !products.length) {
      return;
    }

    dispatch(initializeCart(buildStarterCartItems(products)));
  }, [dispatch, hasHydrated, products]);

  if (!hasHydrated && isLoading) {
    return (
      <section className="status-panel">
        <div className="container">
          <p>Loading cart...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container container--wide cart-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>Cart</span>
      </nav>

      <h1 className="page-title">YOUR CART</h1>

      <div className="cart-layout">
        <section className="cart-panel">
          {cartItems.length ? (
            cartItems.map((item) => (
              <article key={item.itemKey} className="cart-item">
                <Link to={`/product/${item.productId}`} className="cart-item__image-shell">
                  <img src={item.image} alt={item.title} />
                </Link>

                <div className="cart-item__body">
                  <div className="cart-item__header">
                    <div>
                      <Link to={`/product/${item.productId}`} className="cart-item__title">
                        {getShortTitle(item.title, 4)}
                      </Link>
                      <p className="cart-item__meta">
                        Size: <span>{item.size}</span>
                      </p>
                      <p className="cart-item__meta">
                        Color: <span>{item.colorLabel || 'Black'}</span>
                      </p>
                    </div>

                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => dispatch(removeCartItem(item.itemKey))}
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="cart-item__footer">
                    <strong className="cart-item__price">{formatMoney(item.price)}</strong>

                    <div className="cart-stepper">
                      <button
                        type="button"
                        onClick={() => dispatch(decrementCartItem(item.itemKey))}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => dispatch(incrementCartItem(item.itemKey))}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="cart-empty">
              <h2>Your cart is empty.</h2>
              <p>Add a few pieces from the store and they&apos;ll show up here.</p>
              <Link to="/" className="button button--dark">
                Continue Shopping
              </Link>
            </div>
          )}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="cart-summary__rows">
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <strong>{formatMoney(subtotal)}</strong>
            </div>
            <div className="cart-summary__row">
              <span>Discount (-20%)</span>
              <strong className="is-discount">-{formatMoney(discount)}</strong>
            </div>
            <div className="cart-summary__row">
              <span>Delivery Fee</span>
              <strong>{formatMoney(deliveryFee)}</strong>
            </div>
          </div>

          <div className="cart-summary__total">
            <span>Total</span>
            <strong>{formatMoney(total)}</strong>
          </div>

          <form className="cart-promo" onSubmit={(event) => event.preventDefault()}>
            <label className="cart-promo__field" htmlFor="promo-code">
              <Tag size={18} />
              <input id="promo-code" type="text" placeholder="Add promo code" />
            </label>
            <button type="submit" className="button button--dark cart-promo__button">
              Apply
            </button>
          </form>

          <button type="button" className="button button--dark cart-summary__checkout">
            <span>Go to Checkout</span>
            <ArrowRight size={20} />
          </button>
        </aside>
      </div>
    </section>
  );
}
