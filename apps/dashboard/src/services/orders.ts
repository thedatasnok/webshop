import { OrderDetails, OrderListItem, OrderSummary } from '@webshop/contracts';
import { QueryParams, buildQueryParams, webshopApi } from '@webshop/ui';

export interface FindOrdersQueryParams extends QueryParams {
  customerId?: string;
  productName?: string;
}

export const ordersApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Finds the daily order summary.
     */
    findDailyOrderSummary: builder.query<OrderSummary[], void>({
      query: () => '/v1/orders/summary',
    }),

    /**
     * Finds recently placed orders.
     */
    recentOrders: builder.query<OrderListItem[], void>({
      query: () => '/v1/orders/recent',
    }),

    findOrders: builder.query<OrderDetails[], FindOrdersQueryParams>({
      query: (params) => '/v1/orders?' + buildQueryParams(params),
    }),
  }),
});

export const {
  useFindDailyOrderSummaryQuery,
  useRecentOrdersQuery,
  useFindOrdersQuery,
} = ordersApi;
