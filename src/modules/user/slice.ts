import { createSlice } from '@reduxjs/toolkit'
import { createUser, deleteUser, getUsers, updateUser } from './api'
import { UserState } from './types'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loadingUsers: false,
    creatingUser: false,
    creatingError: null,
    updatingUser: false,
    updatingError: null,
    deletingUser: false,
    deletingError: null,
    users: [],
    total: 0,
    selectedUser: null
  } as UserState,
  reducers: {
    resetCreatingError: (state) => {
      state.creatingError = null
    },
    selectUser: (state, action) => {
      const selectedUser = state.users.find((user) => user.id === action.payload)
      if (selectedUser) {
        state.selectedUser = selectedUser
      }
    }
  },
  extraReducers(builder) {
    builder
      // Get users
      .addCase(getUsers.pending, (state) => {
        state.loadingUsers = true
      })
      .addCase(getUsers.fulfilled, (state, data) => {
        state.users = data.payload.users
        state.total = data.payload.total
        state.loadingUsers = false
        if (!state.selectedUser && state.users.length) {
          state.selectedUser = state.users[0]
        }
      })
      // Create user
      .addCase(createUser.pending, (state) => {
        state.creatingUser = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.creatingUser = false
        state.users.push(action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.creatingUser = false
        state.creatingError = action.payload.message
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.updatingUser = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updatingUser = false
        const userId = action.payload.id
        state.users = state.users.map((user) => (user.id === userId ? action.payload : user))
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updatingUser = false
        state.updatingError = action.payload.message
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.deletingUser = true
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.deletingUser = false
        const userId = state.selectedUser.id
        state.users = state.users.filter((user) => user.id !== userId)
        state.selectedUser = null
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deletingUser = false
        state.deletingError = action.payload.message
      })
  }
})
