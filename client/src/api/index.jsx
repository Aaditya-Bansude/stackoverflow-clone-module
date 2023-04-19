import axios from 'axios'

const API = axios.create({baseURL: process.env.SERVER_URL})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (authData) => API.post('/user/login', authData);
export const signUp = (authData) => API.post('/user/signup', authData);

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData);
export const getAllQuestions = () => API.get('/questions/Get');
export const deleteQuestion =(id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, {value, userId});

export const postAnswer = (id, noofAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, {noofAnswers, answerBody, userAnswered, userId});
export const deleteAnswer = (id, answerId, noofAnswers) => API.patch(`/answer/delete/${id}`,{answerId, noofAnswers});

export const fetchAllUsers = () => API.get('/user/getAllUsers');
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData);

export const updateNumber = (id, updatedData) => API.patch(`/user/updateNumber/${id}`, updatedData);
export const updateSubscription = (id, updatedData) => API.patch(`/user/updateSubscription/${id}`, updatedData);

export const sendPost = (postData) => API.post('/community/post', postData);
export const fetchAllPosts = () => API.get('/community/Get');
export const fetchPostsBy = (postData) => API.patch('community/getby', postData);
export const like_dislike = (id, value, userId) => API.patch(`/community/like-dislike/${id}`, {value, userId});
export const deletePost = (id) => API.patch(`/community/delete/${id}`);

export const addFriend = (updateData) => API.patch('/user/updateConnections/add', updateData)
export const removeFriend = (updateData) => API.patch('/user/updateConnections/remove', updateData)

