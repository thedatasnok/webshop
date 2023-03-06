import React from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

const SignIn = React.lazy(() => import('@/views/auth/SignIn'));
const SignUp = React.lazy(() => import('@/views/auth/SignUp'));
const Checkout = React.lazy(() => import('@/views/Checkout'));
const NotFound = React.lazy(() => import('@/views/error/NotFound'));
const LandingPage = React.lazy(() => import('@/views/LandingPage'));
const ProductBrowser = React.lazy(() => import('@/views/ProductBrowser'));
const ProductView = React.lazy(() => import('@/views/ProductView'));
const ShoppingCart = React.lazy(() => import('@/views/ShoppingCart'));
const Support = React.lazy(() => import('@/views/Support'));
const UserProfile = React.lazy(() => import('@/views/UserProfile'));

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
    element: <SignUp />,
  },
  {
    path: '/cart',
    href: '/cart',
    element: <ShoppingCart />,
  },
  {
    path: '/checkout',
    href: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/profile',
    href: '/profile',
    element: <UserProfile />,
  },
  {
    path: '/support',
    element: <Support />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

// browser router - uses DOM history API
const router = createBrowserRouter(routes);

export default router;
