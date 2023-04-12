import { PlaceOrderRequest } from '@webshop/contracts';
import { webshopApi } from '@webshop/ui/src/services/base';

export const userContextOrdersApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Places an order in the current user's context.
     */
    placeOrder: builder.mutation<number, PlaceOrderRequest>({
      query: (body) => ({
        url: '/v1/me/orders',
        method: 'POST',
        body,
        async responseHandler(response) {
          if (response.headers.has('location')) {
            const location = response.headers.get('location');
            return Number(location?.split('/').pop());
          }

          // the API should always return a location header with the order id encoded in it
          // but if it doesn't, we'll return -1 for now
          return -1;
        },
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = userContextOrdersApi;
