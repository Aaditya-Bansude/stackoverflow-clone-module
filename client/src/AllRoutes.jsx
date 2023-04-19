import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Question from './pages/Question/Question'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Question/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import Subscription from './pages/Subscription/Subscription'
import Status from './pages/Subscription/Status'
import Community from './pages/Community/Community'
import Connections from './pages/Community/Connections'
import Mypost from './pages/Community/Myposts'
import Newpost from './pages/Community/Newpost'
import Viewpost from './pages/Community/Viewpost'

const AllRoutes = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home />}/> 
        <Route exact path='/Auth' element={<Auth />}/>
        <Route exact path='/Questions' element={<Question />}/>
        <Route exact path='/AskQuestion' element={<AskQuestion />}/>
        <Route exact path='/Questions/:id' element={<DisplayQuestion />}/>
        <Route exact path='/Tags' element={<Tags />}/>
        <Route exact path='/Users' element={<Users />}/>
        <Route exact path='/Users/:id' element={<UserProfile />}/>
        <Route exact path='/Subscription' element={<Subscription />}/>
        <Route exact path='/Subscription/status/?' element={<Status />}/>
        <Route exact path='/Community' element={<Navigate to='/Community/home' />}/>
        <Route exact path='/Community/home' element={<Community />}/>
        <Route exact path='/Community/mypost' element={<Mypost />}/>
        <Route exact path='/Community/connections' element={<Connections />}/>
        <Route exact path='/Community/newpost' element={<Newpost />}/>
        <Route exact path='/Community/post/:id' element={<Viewpost />}/>
    </Routes>
  )
}

export default AllRoutes