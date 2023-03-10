import { Role } from '@/app/constants';
import DashboardLayout from '@/components/layout/DashboardLayout';
import React from 'react';
import { IconType } from 'react-icons';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import dashboardRoutes from './dashboard';
import { RouteHref } from './enum';

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
    name: 'Sign Up',
    path: RouteHref.SIGN_UP,
    href: RouteHref.SIGN_UP,
    element: <SignUp />,
    authentication: 'logged-out',
  },
  {
    name: 'Dashboard',
    path: '/*',
    element: <DashboardLayout />,
    authentication: 'logged-in',
    children: dashboardRoutes,
  },
];

const router = createBrowserRouter(routes);

export default router;
