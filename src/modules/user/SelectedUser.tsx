import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { deleteUser, updateUser } from './api'
import { UserRole } from './types'

export const SelectedUser = () => {
  const dispatch = useAppDispatch()
  const selectedUser = useAppSelector((state) => state.users.selectedUser)

  // Local state for editing
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
                defaultValue={selectedUser.name}
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
                defaultValue={selectedUser.email}
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
                defaultValue={selectedUser.role}
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
