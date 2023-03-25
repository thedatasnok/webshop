import { Role } from '@/app/constants';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Forbidden from '@/views/error/Forbidden';
import React from 'react';
import { IconType } from 'react-icons';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouteObject,
} from 'react-router-dom';
import dashboardRoutes from './dashboard';
import { RouteHref } from './enum';
import RouteGuard from './RouteGuard';

const SignIn = React.lazy(() => import('@/views/auth/SignIn'));
const SignUp = React.lazy(() => import('@/views/auth/SignUp'));

/**
 * Represents the authentication state of a user.
 */
export type AuthenticationState = 'logged-in' | 'logged-out';

export type ApplicationRoute = RouteObject & {
  name: string;
  href?: string;
  /**
   * The authentication state that is required to access this route.
   */
  authentication?: AuthenticationState;
  /**
   * The roles that are allowed to access this route.
   */
  roles?: Role[];
  /**
   * The icon that is displayed in the sidebar.
   */
  icon?: IconType;
  /**
   * Whether or not this route should be displayed in the sidebar.
   */
  sidebar?: boolean;
  children?: ApplicationRoute[];
};

export const routes: ApplicationRoute[] = [
  {
    name: 'Sign In',
    path: RouteHref.SIGN_IN,
    href: RouteHref.SIGN_IN,
    element: <SignIn />,
    authentication: 'logged-out',
  },
  {
    name: 'Dashboard',
    path: '/*',
    element: <DashboardLayout />,
    authentication: 'logged-in',
    children: dashboardRoutes,
  },
  {
    name: 'Forbidden',
    path: RouteHref.FORBIDDEN,
    href: RouteHref.FORBIDDEN,
    authentication: 'logged-in',
    element: <Forbidden />,
  },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        children={route.children?.map((child: ApplicationRoute) => (
          <Route
            key={child.path}
            path={child.path}
            element={
              <RouteGuard
                key={child.path}
                authentication={child.authentication}
                roles={child.roles}
              >
                {child.element}
              </RouteGuard>
            }
          />
        ))}
        element={
          <RouteGuard
            key={route.path}
            authentication={route.authentication}
            roles={route.roles}
          >
            {route.element}
          </RouteGuard>
        }
      />
    ))
  )
);

export default router;
