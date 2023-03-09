import { ProductListItem } from '@webshop/contracts';
import { webshopApi } from '.';

export const productsApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    findProducts: builder.query<ProductListItem[], void>({
      query: () => '/v1/products',
    }),
  }),
});

export const { useFindProductsQuery } = productsApi;
