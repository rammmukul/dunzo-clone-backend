const express = require('express')
const usersController = require('../controllers/users')
const { authenticate } = require('../../middlewares/authenticate')

const router = express.Router()
const authenticatedRouter = express.Router()

// doesn't need authentication middleware
router.get('/oauthcallback', usersController.oauthcallback)
router.get('/getLoginURL', usersController.getLoginURLAndSend)

// Needs authentication middleware
authenticatedRouter.use(authenticate)
authenticatedRouter.get('/getOrders', authenticate, usersController.getOrdersAndSend)
authenticatedRouter.get('/getOrderDetails', authenticate, usersController.getOrderDetailsAndSend)
authenticatedRouter.get('/signout', authenticate, usersController.signoutUser)
authenticatedRouter.post('/placeorder', authenticate, usersController.placeOrder)
authenticatedRouter.get('/profile', authenticate, usersController.getUserProfile)

router.use(authenticatedRouter)
module.exports = router
