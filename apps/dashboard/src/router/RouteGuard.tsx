import { Role } from '@/app/constants';
import {
  isTokenExpired,
  useAuth,
  useLazyRefreshAccessTokenQuery,
} from '@webshop/ui';
import { useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthenticationState } from '.';
import { RouteHref } from './enum';

interface RouteGuardProps {
  /**
   * The kind of authentication state required for the children component(s) to be rendered.
   */
  authentication?: AuthenticationState;
  /**
   * The roles that are allowed to access this route.
   */
  roles?: Role[];
  /**
   * The children component(s) to render if the required authentication state is met.
   */
  children: React.ReactNode;
}

/**
 * Represents a route guard for the application, meant to be used as a wrapper around a route.
 * It will redirect the user to the appropriate page if they are not logged in or has insufficient permissions.
 */
const RouteGuard: React.FC<RouteGuardProps> = ({
  authentication,
  roles,
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

  /**
   * Checks whether the user is permitted to access the route
   * checking the user's role against the allowed roles for the route.
   */
  const isPermitted = useMemo(() => {
    if (roles && tokenDetails) {
      return roles.map((role) => role.toString()).includes(tokenDetails.role);
    }

    return true;
  }, [tokenDetails, roles]);

  if (authentication === 'logged-out' && isLoggedIn) {
    return <Navigate to={RouteHref.DASHBOARD} />;
  } else if (authentication === 'logged-in' && !isLoggedIn) {
    return <Navigate to={RouteHref.SIGN_IN} />;
  } else if (isPermitted) {
    return <>{children}</>;
  } else {
    return <Navigate to={RouteHref.FORBIDDEN} />;
  }
};

export default RouteGuard;
