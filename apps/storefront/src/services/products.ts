import { ProductDetails, ProductListItem } from '@webshop/contracts';
import { QueryParams, buildQueryParams, webshopApi } from '@webshop/ui';

export interface FindProductsQueryParams extends QueryParams {
  id?: number[];
  name?: string;
  short_description?: string;
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
     * Finds all featured products.
     */
    featuredProducts: builder.query<ProductListItem[], void>({
      query: () => '/v1/products/featured',
    }),

    /**
     * Finds a product by id
     */
    findProduct: builder.query<ProductDetails, number>({
      query: (id) => ({ url: `/v1/products/${id}` }),
    }),
  }),
});

export const {
  useFindProductQuery,
  useFeaturedProductsQuery,
  useFindProductsQuery,
} = productsApi;
