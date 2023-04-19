import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { sendPost } from '../../actions/community'
import { storage } from '../../firebase'
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { v4 } from 'uuid'
import { Button, Upload } from 'antd'
import Uploading from '../../assets/Uploading.gif'

const Newpost = () => {

  const [postTitle, setPostTitle] = useState('')
  const [postDescription, setPostDescription] = useState('')
  const [fileType, setFileType] = useState('')
  const [uploadFile, setUploadFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  var User = useSelector((state) => (state.currentUserReducer))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setUploading(true)

    if(uploadFile){
      const fileRef = ref(storage, `User_${User?.result?.name}/${v4() + uploadFile.name}`)
      uploadBytes(fileRef, uploadFile).then(() => {
        getDownloadURL(fileRef).then((fileURL) =>{
          dispatch(sendPost({postTitle, postDescription, fileType, fileURL, userPosted: User?.result?.name, userId: User?.result?._id}, navigate))
        }).then(() => {
          setUploading(false)
        })
      })
    }
    else{
      dispatch(sendPost({postTitle, postDescription, 'fileType': '', 'fileURL': '', userPosted: User?.result?.name, userId: User?.result?._id}, navigate))
      setUploading(false)
    }
  }

  const handleChange = (e) => {
    if(e.fileList !== undefined){
      setUploadFile(e.fileList[0].originFileObj)
      setFileType(e.fileList[0].originFileObj.type)
    }
  } 

  const handleEnter = (e) => {
    if(e.key === 'Enter'){
        setPostDescription(postDescription + "\n")
    }
  }

  return (
    <div className='container'>
      <Sidebar />
      <div className='mainbar'>
          <div className="new-post-container">
              <h1>Send a Public Post</h1>
              <form onSubmit={handleSubmit}>
                  <div className="post-form">
                      <label htmlFor="post-title">
                          <h4>Title</h4>
                          <p>Be specific and imagine you're sending a post in public.</p>
                          <input className="post-form-title" type="text" id="post-title" onChange={(e) => {setPostTitle(e.target.value)}} placeholder='e.g. A MERN full stack project' required={true}/>
                      </label>
                      <label htmlFor="post-description">
                          <h4>Description</h4>
                          <p>A public message and include descriptive information related to your post.</p>
                          <textarea className="post-form-description" id="post-description" onChange={(e) => {setPostDescription(e.target.value)}} cols="30" rows="10" onKeyPress={handleEnter} required={true}></textarea>
                      </label>
                      <label htmlFor="post-file">
                          <h4>Add a File</h4>
                          <p>Add text, image or video file related to your topic if any.</p>
                          <div className="post-form-file">
                            <Upload.Dragger onChange={handleChange}> 
                              Drag File Here or<br />
                              <Button>Upload File</Button>
                            </Upload.Dragger>
                          </div>
                      </label>
                  </div>
                  <div className='submit-upload'>
                    <input type="submit" value="POST" className='review-post-btn'/>
                    {
                      uploading && 
                      <>
                        <img className='uploading-symbol' src={Uploading} alt="Uploading" />
                        <p className='uploading-note'>Uploading... please do not refresh the page</p>
                      </>
                    }  
                  </div>
              </form>
          </div>
      </div>
    </div>
  )
}

export default Newpost