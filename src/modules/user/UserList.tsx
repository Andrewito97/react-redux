import { Fragment, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { getUsers } from './api'
import './styles.css'
import { userSlice } from './slice'

export const UserList = () => {
  // dispatch needed for sending actions to the store
  const dispatch = useAppDispatch()

  // selectors to get state from the store and subscribe on component re-rendering
  // always extract only the needed state fields to avoid unnecessary re-renders
  const users = useAppSelector((state) => state.users.users)
  const loadingUsers = useAppSelector((state) => state.users.loadingUsers)

  // sync actions update the store
  const { selectUser } = userSlice.actions

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  // Handler for user action
  const handleSelectUser = (userId: string) => {
    dispatch(selectUser(userId))
  }

  // Basic fallback for loading state
  if (loadingUsers) {
    return <div>Loading...</div>
  }

  return (
    <>
      <span className="user-list-title">Users List</span>
      <table className="user-list-container">
        <thead>
          <tr className="user-list-data-header">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        {users.map((user) => (
          <tr key={user.id} className="user-list-data-row">
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <a className="user-list-action-button" onClick={() => handleSelectUser(user.id)}>
                Select
              </a>
            </td>
          </tr>
        ))}
      </table>
    </>
  )
}
