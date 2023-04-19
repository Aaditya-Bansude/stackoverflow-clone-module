import express from 'express'
import { ChatbotAPI } from '../controllers/chatbot.js'

const router = express.Router()

router.post('/response', ChatbotAPI)

export default router