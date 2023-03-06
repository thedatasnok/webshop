import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  type RouteObject,
} from 'react-router-dom';
import RouteGuard from './RouteGuard';

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
 * Represents the authentication state of a user.
 */
export type AuthenticationState = 'logged-in' | 'logged-out';

/**
 * An enum of all hrefs used in the application.
 * Hrefs for all routes should be defined here, with the exception of hrefs that are dynamic.
 * (e.g. /products/:id)
 */
export const enum RouteHref {
  HOME = '/',
  PRODUCTS = '/products',
  SIGN_IN = '/auth/sign-in',
  SIGN_UP = '/auth/sign-up',
  CART = '/cart',
  CHECKOUT = '/checkout',
  PROFILE = '/profile',
  SUPPORT = '/support',
}

/**
 * Represents a route in the application.
 * This is a superset of the RouteObject type from react-router.
 * Specifically includes href, as the path may not be the same as the href in some instances.
 *
 * Any other properties can be added to this type. (flags for requiring authentication, etc.)
 */
export type ApplicationRoute = RouteObject & {
  href?: string;
  authentication?: AuthenticationState;
};

/**
 * The root routes for the application.
 * Any children routes will be defined in their own files.
 */
export const routes: ApplicationRoute[] = [
  {
    path: RouteHref.HOME,
    href: RouteHref.HOME,
    element: <LandingPage />,
  },
  {
    path: RouteHref.PRODUCTS,
    href: RouteHref.PRODUCTS,
    element: <ProductBrowser />,
  },
  {
    path: '/products/:id',
    element: <ProductView />,
  },
  {
    path: RouteHref.SIGN_IN,
    href: RouteHref.SIGN_IN,
    element: <SignIn />,
    authentication: 'logged-out',
  },
  {
    path: RouteHref.SIGN_UP,
    href: RouteHref.SIGN_UP,
    element: <SignUp />,
    authentication: 'logged-out',
  },
  {
    path: RouteHref.CART,
    href: RouteHref.CART,
    element: <ShoppingCart />,
  },
  {
    path: RouteHref.CHECKOUT,
    href: RouteHref.CHECKOUT,
    element: <Checkout />,
  },
  {
    path: RouteHref.PROFILE,
    href: RouteHref.PROFILE,
    element: <UserProfile />,
    authentication: 'logged-in',
  },
  {
    path: RouteHref.SUPPORT,
    href: RouteHref.SUPPORT,
    element: <Support />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

// browser router - uses DOM history API
const router = createBrowserRouter(
  createRoutesFromElements(
    routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={
          // Wrap each route in a RouteGuard component, to allow it for checking
          // whether the user can access the route or not.
          <RouteGuard key={route.path} authentication={route.authentication}>
            {route.element}
          </RouteGuard>
        }
      />
    ))
  )
);

export default router;
