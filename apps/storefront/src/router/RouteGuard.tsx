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
  // TODO: Use the authentication state from the store
  const { isLoggedIn } = { isLoggedIn: false };

  if (authentication === 'logged-out' && isLoggedIn) {
    return <Navigate to={RouteHref.HOME} />;
  } else if (authentication === 'logged-in' && !isLoggedIn) {
    return <Navigate to={RouteHref.SIGN_IN} />;
  } else {
    return <>{children}</>;
  }
};

export default RouteGuard;
