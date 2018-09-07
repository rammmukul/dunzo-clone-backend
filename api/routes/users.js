const router = require('express').Router()
const usersController = require('../controllers/users')
const { authenticate } = require('../../middlewares/authenticate')

// doesn't need authentication middleware
router.get('/oauthcallback', usersController.oauthcallback)
router.get('/getLoginURL', usersController.getLoginURLAndSend)

// Needs authentication middleware
router.get('/getOrders', authenticate, usersController.getOrdersAndSend)
router.get('/getOrderDetails', authenticate, usersController.getOrderDetailsAndSend)
router.get('/signout', authenticate, usersController.signoutUser)
router.post('/placeorder', authenticate, usersController.placeOrder)
router.get('/profile', authenticate, usersController.getUserProfile)

module.exports = router
