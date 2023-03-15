export type QueryParams = Record<
  string,
  string | number | boolean | string[] | number[] | undefined
>;

/**
 * Builds a query string from a given object with query parameters.
 * 
 * @param params an object containing query parameters
 * 
 * @returns a query string with the given parameters, omitting the question mark
 */
export const buildQueryParams = (params: QueryParams) => {
  const searchParams = new URLSearchParams();

  const append = (key: string, value: string | number | boolean) => {
    searchParams.append(key, value.toString());
  };

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => append(key, v));
      } else {
        append(key, value);
      }
    }
  });

  return searchParams.toString();
};
