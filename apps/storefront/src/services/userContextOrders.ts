import { OrderDetails, PlaceOrderRequest } from '@webshop/contracts';
import { QueryParams, buildQueryParams, webshopApi } from '@webshop/ui';

export interface FindOrdersQueryParams extends QueryParams {
  productName?: string;
}

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
      invalidatesTags: [
        {
          type: 'Order',
          id: 'LIST',
        },
      ],
    }),

    /**
     * Finds all orders in user context
     */
    findOrders: builder.query<OrderDetails[], FindOrdersQueryParams>({
      query: (params) => '/v1/me/orders?' + buildQueryParams(params),
      providesTags: [
        {
          type: 'Order',
          id: 'LIST',
        },
      ],
    }),

    /**
     * Gets the specified order
     */
    getOrder: builder.query<OrderDetails, number>({
      query: (id) => `/v1/me/orders/${id}`,
      providesTags: (_order, _error, id) => [
        {
          type: 'Order',
          id,
        },
      ],
    }),

    /**
     * Cancels the specified order.
     */
    cancelOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `/v1/me/orders/${id}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useFindOrdersQuery,
  useGetOrderQuery,
  useCancelOrderMutation,
} = userContextOrdersApi;
