import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  hasHydrated: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initializeCart(state, action) {
      if (state.hasHydrated) {
        return;
      }

      state.items = action.payload;
      state.hasHydrated = true;
    },
    addToCart(state, action) {
      const { product, quantity, color, size } = action.payload;
      const itemKey = `${product.id}-${color}-${size}`;
      const existingItem = state.items.find((item) => item.itemKey === itemKey);

      state.hasHydrated = true;

      if (existingItem) {
        existingItem.quantity += quantity;
        return;
      }

      state.items.push({
        itemKey,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        color,
        size,
        quantity,
      });
    },
    incrementCartItem(state, action) {
      const existingItem = state.items.find((item) => item.itemKey === action.payload);

      if (!existingItem) {
        return;
      }

      existingItem.quantity += 1;
    },
    decrementCartItem(state, action) {
      const existingItem = state.items.find((item) => item.itemKey === action.payload);

      if (!existingItem) {
        return;
      }

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.itemKey !== action.payload);
        return;
      }

      existingItem.quantity -= 1;
    },
    removeCartItem(state, action) {
      state.items = state.items.filter((item) => item.itemKey !== action.payload);
    },
  },
});

export const {
  addToCart,
  decrementCartItem,
  incrementCartItem,
  initializeCart,
  removeCartItem,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartHydrated = (state) => state.cart.hasHydrated;

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectCartDiscount = (state) => selectCartSubtotal(state) * 0.2;

export const selectDeliveryFee = (state) => (state.cart.items.length ? 15 : 0);

export const selectCartTotal = (state) =>
  selectCartSubtotal(state) - selectCartDiscount(state) + selectDeliveryFee(state);

export default cartSlice.reducer;
