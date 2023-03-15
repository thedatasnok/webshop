import { ProductDetails, ProductListItem } from '@webshop/contracts';
import { webshopApi } from '.';
import { buildQueryParams, QueryParams } from './utils';

export interface FindProductsQueryParams extends QueryParams {
  id?: number[];
  name?: string;
}

export const productsApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    findProducts: builder.query<ProductListItem[], FindProductsQueryParams>({
      query: (params) => '/v1/products?' + buildQueryParams(params),
    }),

    findProduct: builder.query<ProductDetails, number>({
      query: (id) => ({ url: `/v1/products/${id}` }),
    }),
  }),
});

export const { useFindProductQuery, useFindProductsQuery } = productsApi;
