import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import './Users.css'
import UsersList from './UsersList'

const Users = () => {

  return (
    <div className='home-container-1'>
        <LeftSidebar />
        <div className='home-container-2'>
            <h1 className='h1'>Users</h1>
            <UsersList /> 
        </div>
    </div>
  )
}

export default Users