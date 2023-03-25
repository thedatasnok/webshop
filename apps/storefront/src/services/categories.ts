import { CategoryDto } from '@webshop/contracts';
import { webshopApi } from '@webshop/ui';

export const categoriesApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Gets all categories
     */
    getCategories: builder.query<CategoryDto[], void>({
      query: () => '/v1/categories',
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
