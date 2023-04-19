import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Avatar from '../../components/Avatar/Avatar'
import Sidebar from './Sidebar'

const Connections = () => {

  const user_id = JSON.parse(localStorage.getItem('Profile'))?.result?._id
  const users = useSelector((state) => state.usersReducer)
  const User = users.filter((user) => user._id === user_id)[0]

  return (
    <div className='container'>
      <Sidebar />
      <div className='mainbar'>
        <h1 className='h1'>Connections</h1>
        {
          User?.connections.length === 0 ? <p style={{marginLeft: '30px'}}>you have not any connections yet</p> :
            <div className='connections-container'>
              {
                User?.connections.map((connection) => (
                  <div className='post-user'>
                    <Avatar backgroundColor="green" px='20px' py='10px' borderRadius='5px'>{connection.userName.charAt(0).toUpperCase()}</Avatar>
                    <div className='post-user-name'>
                      <Link to={`/Users/${connection.userId}`}>
                        <h3>{connection.userName}</h3>
                        <p>joined {moment((users.filter((user)=>user._id===connection.userId)[0]).joinedOn).fromNow()}</p>
                      </Link> 
                    </div>
                  </div>
                ))
              }
            </div>
        }
      </div>
    </div>
  )
}

export default Connections