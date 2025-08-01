import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.js'
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendRequests, getRecommendedUsers, getUserMessages, sendFriendRequest } from '../controllers/user.controller.js'

const router = express.Router()

// Apply auth middleware to all routes in this file
router.use(protectedRoute)
router.get('/', getRecommendedUsers)
router.get('/friends', getMyFriends)

router.post('/friend-request/:id', sendFriendRequest)
router.put('/friend-request/:id/accept', acceptFriendRequest)

router.get('/friend-requests', getFriendRequests)
router.get('/outgoing-friend-requests', getOutgoingFriendRequests)

router.get('/messages', getUserMessages)


export default router