import { PlaceOrderRequest } from '@webshop/contracts';
import { webshopApi } from '@webshop/ui/src/services/base';

export const userContextOrdersApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Places an order in the current user's context.
     */
    placeOrder: builder.mutation<void, PlaceOrderRequest>({
      query: (body) => ({
        url: '/v1/me/orders',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = userContextOrdersApi;
