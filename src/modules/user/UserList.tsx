import { Fragment, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { getUsers } from './api'
import './styles.css'
import { userSlice } from './slice'

export const UserList = () => {
  const dispatchUsers = useAppDispatch()
  const { loadingUsers, users } = useAppSelector((state) => state.users)
  const { selectUser } = userSlice.actions

  useEffect(() => {
    dispatchUsers(getUsers())
  }, [dispatchUsers])

  const handleSelectUser = (userId: string) => {
    dispatchUsers(selectUser(userId))
  }

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
