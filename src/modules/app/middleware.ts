import { Middleware } from '@reduxjs/toolkit'

export const errorMiddleware: Middleware =
  (store) =>
  (next) =>
  (action: { type: string; payload?: { message?: string }; error?: { message?: string } }) => {
    if (action.type.endsWith('/rejected')) {
      console.error('Error middleware:', action.payload?.message || action.error?.message)
    }
    return next(action)
  }
