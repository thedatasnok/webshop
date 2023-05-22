import { OrderListItem, OrderSummary } from '@webshop/contracts';
import { webshopApi } from '@webshop/ui';

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
  }),
});

export const { useFindDailyOrderSummaryQuery, useRecentOrdersQuery } =
  ordersApi;
