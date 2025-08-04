import React from 'react'
import './styles.css'
import { UserRole } from './types'
import { useAppDispatch, useAppSelector } from '../app/store'
import { createUser } from './api'
import { userSlice } from './slice'

export const CreateUserForm = () => {
  const dispatch = useAppDispatch()
  const { creatingUser, creatingError } = useAppSelector((state) => state.users)
  const { resetCreatingError } = userSlice.actions

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const role = formData.get('role') as UserRole

    dispatch(createUser({ name, email, role }))
  }

  const handleResetError = () => {
    dispatch(resetCreatingError())
  }

  return (
    <div className="create-user-form-container">
      <span className="create-user-form-title">Create User</span>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name..." />
        <input type="email" name="email" placeholder="Email..." />
        <label>
          Role:
          <select name="role">
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </label>
        {creatingError && (
          <div className="error-message">
            {creatingError}
            <button className="reset-error-button" onClick={handleResetError}>
              X
            </button>
          </div>
        )}
        <button type="submit" disabled={creatingUser}>
          Create User
        </button>
      </form>
    </div>
  )
}
