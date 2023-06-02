import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

import { AUTH_REFRESH_TOKEN, AUTH_TOKEN, BASE_API_URL } from '@src/constants/common';

import { AuthResponseDTO } from '@api/AuthApi';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers) => {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN);
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    result.error.status === 401 &&
    !result.meta?.request.url.includes('/auth/login') &&
    !result.meta?.request.url.includes('/auth/refresh')
  ) {
    if (refreshToken) {
      const refreshResult = (await baseQuery(
        {
          url: '/auth/refresh',
          body: { refreshToken },
          method: 'post',
        },
        api,
        extraOptions,
      )) as QueryReturnValue<AuthResponseDTO, FetchBaseQueryError, FetchBaseQueryMeta>;
      if ('data' in refreshResult) {
        localStorage.setItem(AUTH_TOKEN, refreshResult.data?.accessToken || '');
        localStorage.setItem(AUTH_REFRESH_TOKEN, refreshResult.data?.refreshToken || '');
        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem(AUTH_REFRESH_TOKEN);
      }
    }
  }
  return result;
};

const api = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'api',
  endpoints: () => ({}),
});

export { api };
