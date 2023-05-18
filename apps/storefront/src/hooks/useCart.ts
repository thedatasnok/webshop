import { useTypedSelector } from '@/store';
import { useMemo } from 'react';

/**
 * Hook to get the cart state from the store.
 *
 * @returns the cart state, wrapped in a memoized object
 */
export const useCart = () => {
  const cart = useTypedSelector((state) => state.cart);

  return useMemo(
    () => ({
      ...cart,
      isEmpty: Object.keys(cart.items).length === 0,
      itemQuantity: Object.values(cart.items).reduce((acc, item) => acc + item, 0),
    }),
    [cart]
  );
};
