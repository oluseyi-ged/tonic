import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';
import {RootState} from 'store';

interface CustomErr {
  data: {
    error: string;
    message: any;
    statusCode: number;
  };
  status: number;
}

const baseUrl = 'www.example.com';

export const queryApi = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState)?.token;
      headers.set('x-api-key', 'aXA7DdqHKemWwXO5maT1hiLuWbOYTyFB');
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomErr, {}>,
  endpoints: builder => ({
    getProfile: builder.query<any, void>({
      query: () => {
        return {
          url: 'users/profile',
        };
      },
    }),
  }),
});

export const {useGetProfileQuery, useLazyGetProfileQuery} = queryApi;
