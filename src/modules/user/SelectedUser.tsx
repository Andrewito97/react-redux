import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { deleteUser, updateUser } from './api'
import { UserRole } from './types'

export const SelectedUser = () => {
  // dispatch needed for sending actions to the store
  const dispatch = useAppDispatch()

  // selectors to get state from the store and subscribe on component re-rendering
  // always extract only the needed state fields to avoid unnecessary re-renders
  const selectedUser = useAppSelector((state) => state.users.selectedUser)

  // Local states
  // There is no need to store this in the Redux store as it is only used for editing
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(UserRole.USER)

  // Sync local state with selectedUser when editing starts
  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name)
      setEmail(selectedUser.email)
      setRole(selectedUser.role)
    }
  }, [selectedUser])

  // Handlers for user actions
  const handleIsEditing = () => {
    setIsEditing((prev) => !prev)
  }
  const handleUpdateUser = () => {
    dispatch(updateUser({ id: selectedUser.id, name, email, role }))
  }
  const handleDeleteUser = () => {
    dispatch(deleteUser(selectedUser.id))
    setIsEditing(false)
  }

  return (
    <div className="selected-user-container">
      <h2>Selected User</h2>
      {selectedUser ? (
        <div>
          <div className="field">
            <label>Name: </label>
            {isEditing ? (
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <span>{selectedUser.name}</span>
            )}
          </div>
          <div className="field">
            <label>Email: </label>
            {isEditing ? (
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <span>{selectedUser.email}</span>
            )}
          </div>
          <div className="field">
            <label>Role: </label>
            {isEditing ? (
              <select
                value={selectedUser.role}
                onChange={(e) => setRole(e.target.value as UserRole)}
              >
                <option value={UserRole.ADMIN}>Admin</option>
                <option value={UserRole.USER}>User</option>
              </select>
            ) : (
              <span>{selectedUser.role}</span>
            )}
          </div>
          <div className="actions">
            <div>
              <button onClick={handleIsEditing}>{isEditing ? 'Cancel' : 'Edit'}</button>
              {isEditing && <button onClick={handleUpdateUser}>Save</button>}
            </div>
            <button onClick={handleDeleteUser}>Delete</button>
          </div>
        </div>
      ) : (
        <p>No user selected</p>
      )}
    </div>
  )
}
