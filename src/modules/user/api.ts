import { createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '../app/constants'
import { CreateUserData, GetUsersResponse, UpdateUserData, User } from './types'
import { Error } from '../app/type'

export const getUsers = createAsyncThunk<GetUsersResponse>('users/getUsers', async () => {
  const res = await fetch(`${BACKEND_URL}/users`, {
    method: 'GET'
  })

  return res.json()
})

export const createUser = createAsyncThunk<User, CreateUserData, { rejectValue: Error }>(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    const res = await fetch(`${BACKEND_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (res.status >= 400) {
      const error: Error = await res.json()
      return rejectWithValue(error)
    }

    return res.json()
  }
)

export const updateUser = createAsyncThunk<User, UpdateUserData, { rejectValue: Error }>(
  'users/updateUser',
  async ({ id, ...userData }, { rejectWithValue }) => {
    const res = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (res.status >= 400) {
      const error: Error = await res.json()
      return rejectWithValue(error)
    }

    return res.json()
  }
)

export const deleteUser = createAsyncThunk<void, string, { rejectValue: Error }>(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    const res = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: 'DELETE'
    })

    if (res.status >= 400) {
      const error: Error = await res.json()
      return rejectWithValue(error)
    }
  }
)
