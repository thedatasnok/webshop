/**
 * Hrefs for the routes registered in the router.
 * This has to be located in a separate file, placing it in the index.tsx file
 * causes a 'Cannot read property of undefined' error when importin it from dashboard.tsx.
 */
export const enum RouteHref {
  SIGN_IN = '/auth/sign-in',
  SIGN_UP = '/auth/sign-up',
  DASHBOARD = '/',
  ITEM_MANAGEMENT = '/items',
  ORDER_MANAGEMENT = '/orders',
  USER_MANAGEMENT = '/users',
  PRODUCT_MANAGEMENT = '/products',
}
