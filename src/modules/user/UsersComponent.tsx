import React from 'react'
import './styles.css'
import { UserList } from './UserList'
import { CreateUserForm } from './CreateUserForm'
import { SelectedUser } from './SelectedUser'

export const UsersComponent = () => (
  <div className="users-component-container">
    <SelectedUser />
    <UserList />
    <CreateUserForm />
  </div>
)
