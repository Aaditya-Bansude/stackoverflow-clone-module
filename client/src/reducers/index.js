import {combineReducers} from "redux";
import authReducer from './auth'
import currentUserReducer from './currentUser'
import questionsReducer from './questions'
import usersReducer from './users'
import communityReducer from "./community"
import postsbyReducer from "./postsby";

export default combineReducers({
    authReducer, currentUserReducer, questionsReducer, usersReducer, communityReducer, postsbyReducer
})