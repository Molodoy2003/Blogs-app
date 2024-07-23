import { Post } from '../types/types'
import { api } from './api'

export const postApi = api.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<Post, { content: string }>({
      query: data => ({
        url: '/posts',
        method: 'POST',
        body: data,
      }),
    }),
    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: '/posts/',
        method: 'GET',
      }),
    }),
    getPostById: builder.query<Post, string>({
      query: id => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: id => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} = postApi

export const {
  endpoints: { createPost, deletePost, getAllPosts, getPostById },
} = postApi
