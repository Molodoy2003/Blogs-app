import { Like } from '../types/types'
import { api } from './api'

export const likesApi = api.injectEndpoints({
  endpoints: builder => ({
    likePost: builder.mutation<Like, { postId: string }>({
      query: data => ({
        url: '/likes',
        method: 'POST',
        body: data,
      }),
    }),
    dislikePost: builder.mutation<void, string>({
      query: id => ({
        url: `/likes/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useDislikePostMutation, useLikePostMutation } = likesApi

export const {
  endpoints: { dislikePost, likePost },
} = likesApi
