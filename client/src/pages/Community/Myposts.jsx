import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar, {FetchPostsBy} from './Sidebar'
import { fetchPostsBy } from '../../actions/community'

const Mypost = () => {

  const User = useSelector((state) => (state.currentUserReducer))
  const dispatch = useDispatch()
  const [posts, setPosts] = useState(null)
  const response = dispatch(fetchPostsBy({'parameter': 'userId', 'postData': User?.result?._id}))
  response.then(function(postsById){
    setPosts(postsById)
  })
  
  try {
    return (
      <div className='container'>
        <Sidebar />
        <div className='mainbar'>
          <div className='above-post-containers'></div>
          <div className='post-containers'>
            {
              posts === null ? <h1 style={{marginLeft: '30px'}}>Loading...</h1> : <FetchPostsBy posts={posts}/>
            }
          </div>
        </div>
      </div>
    )
  } catch (error) {
    const response = dispatch(fetchPostsBy({'parameter': 'userId', 'postData': User?.result?._id}))
    response.then(function(postsById){
      setPosts(postsById)
    })
    console.log(error)
  }
  
}

export default Mypost
