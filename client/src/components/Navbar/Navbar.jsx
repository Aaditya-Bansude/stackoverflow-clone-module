import React, {useEffect} from "react"
import {Link, NavLink} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import StackLogo from '../../assets/StackLogo.png'
import SearchLogo from '../../assets/SearchLogo.svg'
import Avatar from '../../components/Avatar/Avatar'
import './Navbar.css'
import { setCurrentUser } from "../../actions/currentUser"

const Navbar = () => {

    const dispatch = useDispatch()
    var User = useSelector((state) => (state.currentUserReducer))
    const id = JSON.parse(localStorage.getItem('Profile'))?.result?._id
    const users = useSelector((state) => state.usersReducer)
    const authUser = users.filter((user) => user._id === id)[0]
    var subColor = "transperent"

    if(authUser?.subscriptionPlan === "gold"){
        subColor = "gold" 
    }else if(authUser?.subscriptionPlan === "silver"){
        subColor = "silver"
    }else if(authUser?.subscriptionPlan === "free"){
        subColor = "#ef8236"
    }

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'})
        dispatch(setCurrentUser(null))
        window.location.reload(true)
    }

    useEffect(() => {
        const token = User?.token
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout();
            }
        }
        
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    },[dispatch])

    return (
        <nav className="main-nav">
            <div className='Navbar'>
                <Link to='/' className='nav-item nav-logo'>
                    <img src={StackLogo} alt="StackLogo" height='30'/>
                </Link>
                <NavLink to='/About' className='nav-item nav-btn ' >About</NavLink>
                <NavLink to='/Products' className='nav-item nav-btn' >Products</NavLink>
                <NavLink to='/Community' className='nav-item nav-btn' >Community</NavLink>
                <NavLink to='/Subscription' className='nav-item nav-btn' >
                    Subscription
                    <Avatar backgroundColor={subColor} px='1px' py='1px' color='white' />
                </NavLink>
                <form>
                    <input type="text" placeholder="search..."/>
                    <img src={SearchLogo} alt="SearchLogo" width="18" className="SearchIcon"/>
                </form>
                {User === null ? 
                    <Link to='/Auth' className="nav-item nav-links">Log In</Link>:
                        <>
                            <Avatar backgroundColor='#009dff' px='10px' py='7px' borderRadius='50%' color='white'>
                                <Link to={`/Users/${User?.result?._id}`} style={{color: 'white', textDecoration: 'none'}} >
                                    {User?.result?.name.charAt(0).toUpperCase()}
                                </Link>
                            </Avatar>
                            <button className="nav-item nav-links" onClick={handleLogout}>Log Out</button>
                        </>
                }  
            </div>
        </nav>
    )
}

export default Navbar;