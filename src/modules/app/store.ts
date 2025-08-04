import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../user/slice'
import { useDispatch, useSelector } from 'react-redux'
import { errorMiddleware } from './middleware'

export const store = configureStore({
  reducer: {
    users: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorMiddleware)
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
