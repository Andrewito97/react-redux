import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { UsersComponent } from '../user/UsersComponent'
import './styles.css'

export const App = () => (
  <Provider store={store}>
    <UsersComponent />
  </Provider>
)
