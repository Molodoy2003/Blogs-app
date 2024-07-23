import { api } from './api'

export const followsApi = api.injectEndpoints({
  endpoints: builder => ({
    followUser: builder.mutation<void, { followingId: string }>({
      query: data => ({
        url: '/follows',
        method: 'POST',
        body: data,
      }),
    }),
    unfollowUser: builder.mutation<void, { followingId: string }>({
      query: () => ({
        url: `/follows`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnfollowUserMutation } = followsApi

export const {
  endpoints: { followUser, unfollowUser },
} = followsApi
