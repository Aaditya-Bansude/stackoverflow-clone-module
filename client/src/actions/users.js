import * as api from '../api'

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const {data} = await api.fetchAllUsers()
        dispatch({type: 'FETCH_USERS', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = (id, updateData) => async (dispatch) => {
    try {
        const {data} = await api.updateProfile(id, updateData)
        dispatch({type: 'UPDATE_CURRENT_USER', payload: data})
        dispatch(fetchAllUsers())
    } catch (error) {
        console.log(error)
    }
}

export const updateNumber = (id, updatedData) => async (dispatch) => {
    try { 
        const {data} = await api.updateNumber(id, updatedData)
        dispatch({type: 'UPDATE_NUMBER', payload: data})
        dispatch(fetchAllUsers())
    } catch (error) {
        console.log(error)
    }
}

export const updateSubscription = (id, updatedData) => async (dispatch) => {
    try { 
        const {data} = await api.updateSubscription(id, updatedData)
        dispatch({type: 'UPDATE_SUBSCRIPTION', payload: data})
        dispatch(fetchAllUsers())
    } catch (error) {
        console.log(error)
    }
}

export const addFriend = (updateData) => async (dispatch) => {
    try { 
        const {data} = await api.addFriend(updateData)
        dispatch({type: 'UPDATE_CONNECTIONS_ADD', payload: data})
        console.log('added to connections')
        dispatch(fetchAllUsers())
    } catch (error) {
        console.log(error)
    }
}

export const removeFriend = (updateData) => async (dispatch) => {
    try { 
        const {data} = await api.removeFriend(updateData) 
        console.log(data.message)
        dispatch(fetchAllUsers())
    } catch (error) {
        console.log(error)
    }
}