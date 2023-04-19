import * as api from '../api'
import { setCurrentUser } from './currentUser'
import { fetchAllUsers, updateNumber, updateSubscription } from './users'


export const signup = (authData, navigate, setLoading) => async (dispatch) => {

    try{
        setLoading(true)
        const {data} = await api.signUp(authData)
        dispatch({type: 'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        dispatch(fetchAllUsers())
        setLoading(false)
        navigate('/')
    }
    catch(error){
        alert(error.response.data.message)
        setLoading(false)
    }
}

export const login = (authData, navigate, setLoading) => async (dispatch) => {

    try{
        setLoading(true)
        const {data} = await api.logIn(authData)
        dispatch({type: 'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))

        const User = JSON.parse(localStorage.getItem('Profile'))
        const currentDate = Number((new Date().getFullYear()) + ("0" + (new Date().getMonth()+1)).slice(-2) + ("0" + new Date().getDate()).slice(-2))
        const noofQuestions = 0
        if(User?.result?.lastLoginDate < currentDate){
            dispatch(updateNumber(User?.result?._id, {currentDate, noofQuestions}))
        }

        const currentDateTime = new Date()
        const subscriptionDate = new Date(User?.result?.subscriptionDate)
        const dateDifference = Number((currentDateTime.getTime() - subscriptionDate.getTime()) / 86400000)

        console.log(dateDifference)
        const sessionId = User?.result?.sessionId
        if(dateDifference > 30){
            dispatch(updateSubscription(User?.result?._id, {subscriptionPlan: 'free', subscriptionDate: subscriptionDate, sessionId: sessionId}))
        }  

        dispatch(fetchAllUsers())
        setLoading(false)
        navigate('/')
    }
    catch(error){
        alert(error.response.data.message)
        setLoading(false)
    }
}
