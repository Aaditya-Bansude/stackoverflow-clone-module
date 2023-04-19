import express from 'express';
import {login, signup} from '../controllers/auth.js'
import {getAllUsers, updateProfile, updateNumber, updateSubscription, addFriend, removeFriend} from '../controllers/users.js'
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)
router.patch('/updateNumber/:id', auth, updateNumber)
router.patch('/updateSubscription/:id', auth,  updateSubscription)
router.patch('/updateConnections/add', addFriend)
router.patch('/updateConnections/remove', removeFriend)

export default router