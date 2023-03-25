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
  authentication?: AuthenticationState;
  roles?: Role[];
  children: React.ReactNode;
}

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
