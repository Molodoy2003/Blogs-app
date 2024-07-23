import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '../../services/userApi'
import { User } from '../../types/types'

type InitialStateProps = {
  user: User | null
  isAuthenticated: boolean
  users: User[] | null
  current: User | null
  token?: string
}

const initialState: InitialStateProps = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      initialState
    },
    resetUser: state => {
      state.user = null
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.current = action.payload
        state.isAuthenticated = true
      })
      .addMatcher(
        userApi.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          state.user = action.payload
          state.isAuthenticated = true
        }
      )
  },
})

export const { logout, resetUser } = userSlice.actions

export default userSlice.reducer
