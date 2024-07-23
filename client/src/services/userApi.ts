import { User } from '../types/types'
import { api } from './api'

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: userData => ({
        url: '/auth/login',
        method: 'POST',
        body: userData,
      }),
    }),
    register: builder.mutation<
      { email: string; password: string; name: string },
      { email: string; password: string; name: string }
    >({
      query: userData => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    current: builder.query<User, void>({
      query: () => ({
        url: '/auth/current',
        method: 'GET',
      }),
    }),
    getUserById: builder.query<User, string>({
      query: id => ({
        url: `/auth/users/${id}`,
        method: 'GET',
      }),
    }),
    update: builder.mutation<User, { userData: FormData; id: string }>({
      query: ({ userData, id }) => ({
        url: `/auth/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useCurrentQuery,
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
  useUpdateMutation,
} = userApi

export const {
  endpoints: { login, register, current, getUserById, update },
} = userApi
