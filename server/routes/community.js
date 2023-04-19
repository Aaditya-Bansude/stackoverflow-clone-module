import express from 'express'
import {SendPost, DeletePost, FetchAllPosts, FetchPostsBy, like_dislike} from '../controllers/community.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/post', auth, SendPost)
router.get('/Get', FetchAllPosts)
router.patch('/getby', FetchPostsBy)
router.patch('/like-dislike/:id', like_dislike) 
router.patch('/delete/:id', DeletePost) 

export default router