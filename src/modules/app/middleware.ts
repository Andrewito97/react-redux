import { Middleware } from '@reduxjs/toolkit'
import { AppStore } from './store'

type ErrorAction = {
  type: string
  payload?: { message?: string }
  error?: { message?: string }
}

// Middleware to log errors from rejected actions
// It has access to the store and can intercept actions
// This is useful for debugging and handling errors globally
export const errorMiddleware: Middleware = (store: AppStore) => (next) => (action: ErrorAction) => {
  if (action.type.endsWith('/rejected')) {
    console.error('Error middleware:', action.payload?.message || action.error?.message)
  }
  return next(action)
}
