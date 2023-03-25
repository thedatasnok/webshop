import { OrderSummary } from '@webshop/contracts';
import { webshopApi } from '@webshop/ui';

export const ordersApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    findDailyOrderSummary: builder.query<OrderSummary[], void>({
      query: () => '/v1/orders/summary',
    }),
  }),
});

export const { useFindDailyOrderSummaryQuery } = ordersApi;
