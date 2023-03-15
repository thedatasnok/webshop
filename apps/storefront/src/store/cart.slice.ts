import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

type ProductId = number;
type Quantity = number;

const CART_STORAGE_KEY = 'cart';

interface CartItemMap {
  [Key: ProductId]: Quantity;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  items: {
    [key: ProductId]: Quantity;
  };
}

/**
 * Reads and returns the carts items from local storage.
 *
 * @returns cart items
 */
const readCartFromStorage = () => {
  let cart: CartItemMap = {};

  const storedItems = window.localStorage.getItem(CART_STORAGE_KEY);
  if (storedItems) cart = JSON.parse(storedItems);

  return cart;
};

/**
 * Writes the cart items to local storage.
 *
 * @param state the state of the cart
 */
const writeCartToStorage = (state: CartState) => {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
};

const initialState: CartState = {
  items: readCartFromStorage(),
};

/**
 * Slice for managing cart state.
 */
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Action to add a product to the cart.
     *
     * @param state the current state of the store slice
     * @param action the dispatched action containing the product id
     */
    addToCart: (state, { payload: productId }: PayloadAction<number>) => {
      if (productId in state.items) {
        state.items[productId]++;
      } else {
        state.items[productId] = 1;
      }
    },
    /**
     * Action to update the quantity of a product in the cart.
     *
     * @param state the current state of the store slice
     * @param action the dispatched action containing the cart item to update
     */
    updateCartItem: (state, { payload: item }: PayloadAction<CartItem>) => {
      if (item.productId in state.items) {
        state.items[item.productId] = item.quantity;
      }
    },
    /**
     * Action to remove a cart item.
     *
     * @param state the current state of the store slice
     * @param action the dispatched action containing the cart item to remove
     */
    removeCartItem: (state, { payload: item }: PayloadAction<CartItem>) => {
      if (item.productId in state.items) {
        delete state.items[item.productId];
      }
    },
  },
  extraReducers: (builder) => {
    /**
     * Whenever the state of the cart updates, store the changes in local storage.
     */
    builder.addMatcher((action) => {
      return action.type.startsWith('cart/');
    }, writeCartToStorage);
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addToCart, removeCartItem, updateCartItem } = cartSlice.actions;
