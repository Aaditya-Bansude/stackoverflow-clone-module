import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import moment from 'moment'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './UserProfile.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import CakeIcon from '../../assets/CakeIcon.png'
import PenLogo from '../../assets/PenLogo.svg'

const UserProfile = () => {

    const {id} = useParams()
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)

    const [Edit, setEdit] = useState(false)

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2'>
                <section>
                    <div className='user-details-container'>
                        <div className='user-details'>
                            <Avatar backgroundColor='purple' color='white' fontSize='50px' px='50px' py='30px'>
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className='user-name'>
                                <h1>{currentProfile?.name}</h1>
                                <p>
                                    <img src={CakeIcon} alt="" height='16px'/> Joined {moment(currentProfile?.joinedOn).fromNow()}
                                </p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type='button' onClick={() => setEdit(true)} className='edit-profile-btn'>
                                    <img src={PenLogo} alt="" height='14px'/> Edit Profile
                                </button>
                            )
                        }
                    </div>
                    <>
                        {
                            Edit ? (
                            <EditProfileForm currentUser={currentUser} setEdit={setEdit}/>
                            ) : (
                            <ProfileBio currentProfile={currentProfile}/>
                            )
                        }
                    </>
                </section>
            </div>
        </div>
    )
}

export default UserProfile