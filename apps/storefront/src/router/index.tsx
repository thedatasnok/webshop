import SignIn from '@/views/auth/SignIn';
import NotFound from '@/views/error/NotFound';
import LandingPage from '@/views/LandingPage';
import ProductBrowser from '@/views/ProductBrowser';
import ProductView from '@/views/ProductView';
import ShoppingCart from '@/views/ShoppingCart';

import { createBrowserRouter, type RouteObject } from 'react-router-dom';

/**
 * Represents a route in the application.
 * This is a superset of the RouteObject type from react-router.
 * Specifically includes href, as the path may not be the same as the href in some instances.
 *
 * Any other properties can be added to this type. (flags for requiring authentication, etc.)
 */
export type ApplicationRoute = RouteObject & {
  href?: string;
};

/**
 * The root routes for the application.
 * Any children routes will be defined in their own files.
 */
export const routes: ApplicationRoute[] = [
  {
    path: '/',
    href: '/',
    element: <LandingPage />,
  },
  {
    path: '/products',
    href: '/products',
    element: <ProductBrowser />,
  },
  {
    path: '/products/:id',
    element: <ProductView />,
  },
  {
    path: '/auth/sign-in',
    href: '/auth/sign-in',
    element: <SignIn />,
  },
  {
    path: '/auth/sign-up',
    href: '/auth/sign-up',
    element: <SignIn />,
  },
  {
    path: '/cart',
    href: '/cart',
    element: <ShoppingCart />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

// browser router - uses DOM history API
const router = createBrowserRouter(routes);

export default router;
