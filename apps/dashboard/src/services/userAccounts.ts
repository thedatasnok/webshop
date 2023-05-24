import { UserAccountListItem } from '@webshop/contracts';
import { QueryParams, buildQueryParams, webshopApi } from '@webshop/ui';

export interface FindUserAccountsQueryParams extends QueryParams {
  fullName?: string;
  email?: string;
  verified?: boolean;
}

export const userAccountsApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Finds user accounts.
     */
    findUserAccounts: builder.query<
      UserAccountListItem[],
      FindUserAccountsQueryParams
    >({
      query: (params) => `/v1/user-accounts?${buildQueryParams(params)}`,
    }),
  }),
});

export const { useFindUserAccountsQuery } = userAccountsApi;
