import { PlaceOrderRequest } from '@webshop/contracts';
import { webshopApi } from '@webshop/ui/src/services/base';

export const ordersApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Checkout
     */
    placeOrder: builder.mutation<void, PlaceOrderRequest>({
      query: (body) => ({
        url: '/v1/orders',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = ordersApi;
