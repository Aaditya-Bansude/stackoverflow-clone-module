import React from 'react'
import '../../App.css'
import Mainbar from '../../components/Mainbar/Mainbar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'

const Home = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar />
      
      <div className='home-container-2'>
        <Mainbar />
        <RightSidebar />
      </div>
    
    </div>
  )
}

export default Home