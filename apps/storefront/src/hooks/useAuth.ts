import { selectAuth } from '@/store/auth.slice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * Hooks to get the auth state from the store.
 *
 * @returns the auth state, wrapped in a memoized object
 */
export const useAuth = () => {
  const tokenDetails = useSelector(selectAuth);

  return useMemo(() => ({ ...tokenDetails }), [tokenDetails]);
};
