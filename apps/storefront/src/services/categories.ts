import { Category } from '@webshop/contracts';
import { webshopApi } from '.';

export const categoriesApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Gets all categories
     */
    getCategories: builder.query<Category[], void>({
      query: () => '/v1/categories',
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
