import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { api } from '../services/api'
import { listenerMiddleware } from '../services/middleware/auth'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
