import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import { fetchAllPosts } from '../../actions/community';
import Sidebar from './Sidebar'
import FileViewer from 'react-file-viewer'
import Avatar from '../../components/Avatar/Avatar'
import LikeIcon from '../../assets/LikeIcon.png'
import LikeBlueIcon from '../../assets/LikeBlueIcon.png'
import DisLikeIcon from '../../assets/DisLikeIcon.png'
import DisLikeBlueIcon from '../../assets/DisLikeBlueIcon.png'
import AddFriend from '../../assets/AddFriend.png'
import RemoveFriend from '../../assets/RemoveFriend.png'
import ShareIcon from '../../assets/ShareIcon.png'
import { addFriend, removeFriend } from '../../actions/users'
import { like_dislike, deletePost } from '../../actions/community'

const Viewpost = () => {

  var post
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const user_id = JSON.parse(localStorage.getItem('Profile'))?.result?._id
  const users = useSelector((state) => state.usersReducer)
  const User = users.filter((user) => user._id === user_id)[0]
  const allPosts = useSelector(state => state.communityReducer)
  const url = process.env.CLIENT_URL+location.pathname

  try {
    post = allPosts.data.filter(post => post._id === id)[0]
  } catch (error) {
    dispatch(fetchAllPosts())
  }

  const handleShare = () => {
    copy(url)
    alert('copied url: '+url)
  }

  const handleDelete = () => {
    dispatch(deletePost(id, navigate))
  }

  const handleLikes = () => {
    dispatch(like_dislike(id, 'like', User?._id))
  }

  const handleDislikes = () => {
    dispatch(like_dislike(id, 'dislike', User?._id))
  }

  const handleAddFriend = () => {
    dispatch(addFriend({'_id': User?._id, 'userId':post.userId, 'userName': post.userPosted}))
  }

  const handleRemoveFriend = () => {
    dispatch(removeFriend({'_id': User?._id, 'userId': post.userId}))
  }

  return(
    <div className='container'>
      <Sidebar />
      <div className='mainbar'>
        <div className='above-post-containers'></div>
        {
          allPosts.data === null ? <h1>Loading...</h1> :
            <div key={post._id} className='post-container'>
              <div className='post-user'>
                <Avatar backgroundColor={post.userPosted === User?.name ? "orange": "green"} px='20px' py='10px' borderRadius='5px'>{post.userPosted.charAt(0).toUpperCase()}</Avatar>
                <div className='post-user-name'>
                  <Link to={`/Users/${post.userId}`}>
                    <h3>{post.userPosted}</h3>
                  </Link> 
                  <p>posted {moment(post.postedOn).fromNow()}</p>
                </div>
                <div className='post-user-delete'>
                  {
                    User?._id === post.userId && <button onClick={handleDelete}>Delete Post</button>
                  }
                </div>
              </div>
              <div className='post-data'>
                <h4>{post.postTitle}</h4>
                <div>
                  {post.postFiles.fileType.slice(0,5) === 'image' ? <img src={post.postFiles.fileURL} alt="POST" /> : <></>}
                  {post.postFiles.fileType.slice(0,5) === 'video' ? <video src={post.postFiles.fileURL} alt="POST" controls/> : <></>}
                  {post.postFiles.fileType.slice(0,5) === 'appli' ? <div className='post-data-application'><FileViewer filePath={post.postFiles.fileURL} fileType={post.postFiles.fileType.slice(12)}/></div> : <></>}
                </div>
                <pre>{post.postDescription}</pre>
              </div>
              <div className='post-footer'>
                { 
                  User === undefined ?
                    <> 
                      <div>
                        <img src={LikeIcon} alt="like" height='20px'/>
                        <p>{post.likes.length} likes</p>
                      </div> 
                      <div>
                        <img src={DisLikeIcon} alt="like" height='20px'/>
                        <p>{post.dislikes.length} dislikes</p>
                      </div>
                    </> 
                    : 
                    <>
                      <div className='post-footer-div' onClick={handleLikes}>
                        <img src={post.likes.includes(User?._id) ? LikeBlueIcon : LikeIcon} alt="like" height='20px'/>
                        <p>{post.likes.length} likes</p>
                      </div>  
                      <div className='post-footer-div' onClick={handleDislikes}>
                        <img src={post.dislikes.includes(User?._id) ? DisLikeBlueIcon : DisLikeIcon} alt="like" height='20px'/>
                        <p>{post.dislikes.length} dislikes</p>
                      </div>  
                    </>
                }
                <div className='post-footer-div'>
                  { 
                    (User === undefined || User?._id === post.userId) ? <></> :
                      <>
                        {
                          User?.connections?.includes(User?.connections?.find(connection=> connection.userId === post.userId)) ?
                          <div onClick={handleRemoveFriend}>
                            <img src={RemoveFriend} alt="remove friend" height='20px'/> 
                            <p>Remove friend</p>
                          </div> 
                          :
                          <div onClick={handleAddFriend}>
                            <img src={AddFriend} alt="add friend" height='20px'/> 
                            <p>Add friend</p>
                          </div>
                        }
                      </>  
                  }
                </div>
                <div className='post-footer-div' onClick={handleShare}>
                  <img src={ShareIcon} alt="Share" height='20px'/> 
                  <p>share</p>
                </div>
              </div>
            </div>     
        }
      </div>
    </div>
  )
}

export default Viewpost
