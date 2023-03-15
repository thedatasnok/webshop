import { selectCart } from '@/store/cart.slice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * Hooks to get the cart state from the store.
 *
 * @returns the cart state, wrapped in a memoized object
 */
export const useCart = () => {
  const cart = useSelector(selectCart);

  return useMemo(() => ({ ...cart }), [cart]);
};
