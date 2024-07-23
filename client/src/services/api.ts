import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'
import { RootState } from '../redux/store'

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).user.token || localStorage.getItem('token')

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

type BaseQueryWithRetry = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>
const baseQueryWithRetry = retry(baseQuery, {
  maxRetries: 1,
}) as BaseQueryWithRetry

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
})
