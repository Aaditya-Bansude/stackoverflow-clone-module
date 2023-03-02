import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { updateProfile } from '../../actions/users'

const EditProfileForm = ({currentUser, setEdit}) => {

    const [name, setName] = useState(currentUser?.result?.name)
    const [about, setAbout] = useState(currentUser?.result?.about)
    const [tags, setTags] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(tags.length === 0){
            dispatch(updateProfile(currentUser?.result?._id, {name, about, tags: currentUser?.result?.tags}))
        }else{
            dispatch(updateProfile(currentUser?.result?._id, {name, about, tags}))
        }
        setEdit(false)
    }

    return (
        <div>
            <h1 className='edit-profile-h1'>
                Edit Your Profile
            </h1>
            <h2 className='edit-profile-h2'>
                Public Information
            </h2>
            <form className='edit-profile-form' onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h3>Name</h3>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label htmlFor="about">
                    <h3>About me</h3>
                    <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                </label>
                <label htmlFor="tags">
                    <h3>Watched Tags</h3>
                    <p>Add tags seperated by one space</p>
                    <input type="text" id='tags' onChange={(e) => setTags(e.target.value.split(' '))} />
                </label><br />
                <input type="submit" value='Save Profile' className='user-submit-btn'/>
                <button type='button' className='user-cancel-btn' onClick={() => setEdit(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default EditProfileForm