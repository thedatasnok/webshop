import { useMemo } from 'react';
import { useCoreSelector } from '../store';

/**
 * Hooks to get the auth state from the store.
 *
 * @returns the auth state, wrapped in a memoized object
 */
export const useAuth = () => {
  const tokenDetails = useCoreSelector((state) => state.auth);

  return useMemo(() => ({ ...tokenDetails }), [tokenDetails]);
};
