import { useAuth } from '@/hooks/useAuth';
import { useLazyRefreshAccessTokenQuery } from '@/services/auth';
import { isTokenExpired } from '@/store/auth.slice';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthenticationState, RouteHref } from '.';

interface RouteGuardProps {
  /**
   * The kind of authentication state required for the children component(s) to be rendered.
   */
  authentication?: AuthenticationState;
  /**
   * The children component(s) to render if the required authentication state is met.
   */
  children: React.ReactNode;
}

/**
 * Represents a route guard for the application, meant to be used as a wrapper around a route.
 * It will redirect the user to the appropriate page if they are not logged in or logged out.
 */
const RouteGuard: React.FC<RouteGuardProps> = ({
  authentication,
  children,
}) => {
  const { isLoggedIn, tokenDetails } = useAuth();
  const [refreshAccessToken] = useLazyRefreshAccessTokenQuery();

  /**
   * Interval check to refresh the access token if it has expired.
   */
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (tokenDetails && isTokenExpired(tokenDetails)) {
        refreshAccessToken();
      }
    };

    checkTokenExpiration(); // check once on mount
    const tokenRefresher = setInterval(checkTokenExpiration, 1000);

    return () => clearInterval(tokenRefresher);
  }, [tokenDetails]);

  if (authentication === 'logged-out' && isLoggedIn) {
    return <Navigate to={RouteHref.HOME} />;
  } else if (authentication === 'logged-in' && !isLoggedIn) {
    return <Navigate to={RouteHref.SIGN_IN} />;
  } else {
    return <>{children}</>;
  }
};

export default RouteGuard;
