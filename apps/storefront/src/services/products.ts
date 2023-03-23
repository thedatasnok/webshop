import { ProductDetails, ProductListItem } from '@webshop/contracts';
import { webshopApi } from '.';
import { buildQueryParams, QueryParams } from './utils';

export interface FindProductsQueryParams extends QueryParams {
  id?: number[];
  name?: string;
  categoryId?: number[];
  allowEmptyIdList?: boolean;
  previousPrice?: number;
}

export const productsApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Finds all products
     */
    findProducts: builder.query<ProductListItem[], FindProductsQueryParams>({
      query: (params) => '/v1/products?' + buildQueryParams(params),
    }),

    /**
     * Finds a product by id
     */
    findProduct: builder.query<ProductDetails, number>({
      query: (id) => ({ url: `/v1/products/${id}` }),
    }),
  }),
});

export const { useFindProductQuery, useFindProductsQuery } = productsApi;
