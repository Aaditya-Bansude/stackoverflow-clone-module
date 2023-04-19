import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import './Sidebar.css'
import FileViewer from 'react-file-viewer'
import { fetchAllPosts } from '../../actions/community'
import Avatar from '../../components/Avatar/Avatar'
import LikeIcon from '../../assets/LikeIcon.png'
import DisLikeIcon from '../../assets/DisLikeIcon.png'

export const FetchAllPosts = () => {
  const dispatch = useDispatch()
  dispatch(fetchAllPosts())
  const allPosts = useSelector(state => state.communityReducer)
  const User = useSelector((state) => (state.currentUserReducer))

  return(
    <>
    {
      allPosts.data === null ? <h1 style={{marginLeft: '30px'}}>Loading...</h1> :
      <>
        {
          allPosts.data.map((post) => {
            return(
              <div className='post-container'>
                <div className='post-user'>
                  <Avatar backgroundColor={post.userPosted === User?.result?.name ? "orange": "green"} px='20px' py='10px' borderRadius='5px'>{post.userPosted.charAt(0).toUpperCase()}</Avatar>
                  <div className='post-user-name'>
                    <Link to={`/Users/${post.userId}`}>
                      <h3>{post.userPosted}</h3>
                    </Link> 
                    <p>posted {moment(post.postedOn).fromNow()}</p>
                  </div>
                </div>
                <div className='post-data'>
                  <Link to={`/Community/post/${post._id}`}>
                    <h4>{post.postTitle}</h4>
                  </Link>
                  <div className='post-data-file'>
                    {post.postFiles.fileType.slice(0,5) === 'image' ? <img src={post.postFiles.fileURL} alt="POST" /> : <></>}
                    {post.postFiles.fileType.slice(0,5) === 'video' ? <video src={post.postFiles.fileURL} alt="POST" controls /> : <></>}
                    {post.postFiles.fileType.slice(0,5) === 'appli' ? <FileViewer filePath={post.postFiles.fileURL} fileType={post.postFiles.fileType.slice(12)} /> : <></>}
                  </div>
                  <pre>{post.postDescription}</pre>
                </div>
                <div className='post-footer'>
                  <div>
                    <img src={LikeIcon} alt="like" height='20px'/>
                    <p>{post.likes.length} likes</p>
                  </div>
                  <div>
                    <img src={DisLikeIcon} alt="dislike" height='20px'/> 
                    <p>{post.dislikes.length} dislikes</p>
                  </div>
                  <div className='post-footer-last-div'></div>
                </div>
              </div>
            )
          })
        }
      </>
    }
    </>
  )
}

export const FetchPostsBy = ({posts}) => {
  const User = useSelector((state) => (state.currentUserReducer))
  
  return(
    <>
      {
        posts.data.length === 0 ? <p style={{marginLeft: '30px'}}>you haven't posted any post yet!</p> :
        <>
          {
            posts.data.map((post) => {
              return(
                <div className='post-container'>
                  <div className='post-user'>
                    <Avatar backgroundColor={post.userPosted === User?.result?.name ? "orange": "green"} px='20px' py='10px' borderRadius='5px'>{post.userPosted.charAt(0).toUpperCase()}</Avatar>
                    <div className='post-user-name'>
                      <Link to={`/Users/${post.userId}`}>
                        <h3>{post.userPosted}</h3>
                      </Link> 
                      <p>posted {moment(post.postedOn).fromNow()}</p>
                    </div>
                  </div>
                  <div className='post-data'>
                    <Link to={`/Community/post/${post._id}`}>
                      <h4>{post.postTitle}</h4>
                    </Link>
                    <div className='post-data-file'>
                      {post.postFiles.fileType.slice(0,5) === 'image' ? <img src={post.postFiles.fileURL} alt="POST" /> : <></>}
                      {post.postFiles.fileType.slice(0,5) === 'video' ? <video src={post.postFiles.fileURL} alt="POST" controls/> : <></>}
                      {post.postFiles.fileType.slice(0,5) === 'appli' ? <FileViewer filePath={post.postFiles.fileURL} fileType={post.postFiles.fileType.slice(12)} /> : <></>}
                    </div>
                    <pre>{post.postDescription}</pre>
                  </div>
                  <div className='post-footer'>
                    <div>
                      <img src={LikeIcon} alt="like" height='20px'/>
                      <p>{post.likes.length} likes</p>
                    </div>
                    <div>
                      <img src={DisLikeIcon} alt="dislike" height='20px'/> 
                      <p>{post.dislikes.length} dislikes</p>
                    </div>
                    <div className='post-footer-last-div'></div>
                  </div>
                </div>
              )
            })
          }
        </>
      }    
    </>
    
  )
}

const Sidebar = () => {
  var User = useSelector((state) => (state.currentUserReducer))

  const checkUser = () => {
    if(User === null){
      alert("You haven't logged in. Login or signup to continue")
    }
  }
  
  return (
    <div className='sidebar'>
        <nav className='side-nav'>
          <NavLink to='/Community/home' className='side-nav-links' activeClassName='active'>
            <p>Media Community</p>
          </NavLink>
          <NavLink onClick={checkUser} to={User? `/Community/mypost` : '/Auth'} className='side-nav-links' activeClassName='active'>
            <p>My Posts</p>
          </NavLink>
          <NavLink onClick={checkUser} to={User? '/Community/connections' : '/Auth'} className='side-nav-links' activeClassName='active'>
            <p>My Connections</p>
          </NavLink>
        </nav>
    </div>
  )
}

export default Sidebar