import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../user/slice'
import { useDispatch, useSelector } from 'react-redux'
import { errorMiddleware } from './middleware'

// Global store configuration
// This is where we combine all slices and apply middlewares
// The store is the single source of truth for the application state
// It holds the state tree and allows access to it via selectors
export const store = configureStore({
  reducer: {
    users: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorMiddleware)
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type AppStore = typeof store

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
