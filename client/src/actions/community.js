import * as api from '../api'


export const sendPost = (postData, navigate) => async (dispatch) => {
  try {
    const {data} = await api.sendPost(postData)
    dispatch({type: "SEND_POST", payload: data})
    dispatch(fetchAllPosts())
    navigate('/Community/home')
  } catch (error) {
      console.log(error)
  }
}

export const fetchAllPosts = () => async (dispatch) => {
  try {
    const {data} = await api.fetchAllPosts()
    dispatch({type: "FETCH_ALL_POSTS", payload: data})
  } catch (error) {
    console.log(error)
  }
}

export const fetchPostsBy = (postData) => async () => {
  try {
    const {data} = await api.fetchPostsBy(postData) 
    // dispatch({type: "FETCH_POSTS_BY", payload: data})
    return({'data': data})
  } catch (error) {
    console.log(error)
  }
}

export const like_dislike = (id, value, userId) => async (dispatch) => {
  try {
    const {data} = await api.like_dislike(id, value, userId)
    dispatch(fetchAllPosts())
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = (id, navigate) => async (dispatch) => {
  try {
    const {data} = await api.deletePost(id)
    dispatch(fetchAllPosts())
    navigate('/Community/home')
  } catch (error) {
    console.log(error)
  }
}
