import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {RootState} from 'store';

interface CustomError {
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
  status: number;
}

const baseUrl = 'https://api.countrystatecity.in/v1/';

export const extApi = createApi({
  reducerPath: 'extApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState)?.user?.access_token;
      headers.set('X-Client-Type', 'mobile');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: builder => ({
    getCountries: builder.query({
      query: () => {
        return {
          url: 'countries',
        };
      },
    }),
    getStates: builder.query({
      query: country => {
        return {
          url: `countries/${country}/states`,
        };
      },
    }),
    getCities: builder.query({
      query: data => {
        return {
          url: `countries/${data?.country}/states/${data?.state}/cities`,
        };
      },
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useLazyGetStatesQuery,
  useLazyGetCitiesQuery,
} = extApi;
