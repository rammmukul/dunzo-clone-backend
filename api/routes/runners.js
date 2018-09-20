const express = require('express')
const runnersController = require('../controllers/runners')
const { authenticate } = require('../../middlewares/authenticate')

const router = express.Router()
const authenticatedRouter = express.Router()

// doesn't need authentication middleware
router.get('/login', runnersController.getLoginUrl)
router.get('/oauthcallback', runnersController.oauthcallback)

// Needs authentication middleware
authenticatedRouter.use(authenticate)
authenticatedRouter.get('/signout', runnersController.signoutRunner)
authenticatedRouter.get('/profile', runnersController.getRunnerProfile)
authenticatedRouter.get('/currentOrder', runnersController.getCurrentOrder)
authenticatedRouter.get('/', runnersController.redirectToCurrentOrder)
authenticatedRouter.get('/pastOrders', runnersController.getPastOrders)
authenticatedRouter.post('/takeorder', runnersController.takeOrder)
authenticatedRouter.post('/fulfillorder', runnersController.fulfillOrder)
authenticatedRouter.post('/cancelorder', runnersController.cancelOrder)

router.use(authenticatedRouter)
module.exports = router
