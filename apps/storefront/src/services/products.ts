import { ProductDetails, ProductListItem } from '@webshop/contracts';
import { webshopApi } from '.';

export const productsApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    findProducts: builder.query<ProductListItem[], void>({
      query: () => '/v1/products',
    }),

    findProduct: builder.query<ProductDetails, number>({
      query: (id) => ({ url: `/v1/products/${id}` }),
    }),
  }),
});

export const { useFindProductQuery } = productsApi;
export const { useFindProductsQuery } = productsApi;
