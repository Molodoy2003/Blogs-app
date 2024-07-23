import { Comment } from '../types/types'
import { api } from './api'

export const commentApi = api.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: data => ({
        url: '/comments',
        method: 'POST',
        body: data,
      }),
    }),
    deleteComment: builder.mutation<void, string>({
      query: id => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useCreateCommentMutation, useDeleteCommentMutation } = commentApi

export const {
  endpoints: { createComment, deleteComment },
} = commentApi
