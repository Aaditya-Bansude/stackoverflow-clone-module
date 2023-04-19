import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar, {FetchAllPosts, FetchPostsBy} from './Sidebar'
import { fetchAllPosts } from '../../actions/community'
import { fetchPostsBy } from '../../actions/community'
import Loading from '../../assets/Loading.gif'

const Community = () => {

  const User = useSelector((state) => (state.currentUserReducer))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [postTitle, setPostTitle] = useState('')
  const [posts, setPosts] = useState('')
  const [allPosts, setAllPosts] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSearch = (e) => {
    if(e.key === 'Enter'){
      setLoading(true)
      const response = dispatch(fetchPostsBy({'parameter': 'postTitle', 'postData': postTitle}))
      response.then(function(postsByTitle){
        setPosts(postsByTitle)
        setAllPosts(false)
        setLoading(false)
      })
    }
  }

  const handleChange = (e) => {
    setPostTitle(e.target.value)
    if(e.target.value === ''){
      setPosts('')
      setAllPosts(true)
    }
  }

  const checkUser = () => {
    if(User === null){
      alert("You haven't logged in. Login or signup to continue")
    }
    else{
      navigate('/Community/newpost')
    }
  }

  try {
    return (
      <div className='container'>
            <Sidebar />
            <div className='mainbar'>
              <div className='search-form'>
                  <input onChange={handleChange} onKeyPress={handleSearch} type="search" placeholder="search by post title"></input>
                  {
                    loading && <img  src={Loading} alt="Loading" height='30px'/>
                  }
                  <div><button onClick={checkUser} className='post-btn'>+ New Post</button></div>
              </div>
              <div className='post-containers'>
                {
                  allPosts ? <FetchAllPosts /> : <FetchPostsBy posts={posts}/>
                }
              </div>
            </div>
      </div>
    )
  } catch (error) {
    console.log(error)
    dispatch(fetchAllPosts())
  }
  
}

export default Community



