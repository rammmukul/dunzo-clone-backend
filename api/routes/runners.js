const router = require('express').Router()
const runnersController = require('../controllers/runners')
const { authenticate } = require('../../middlewares/authenticate')

router.get('/login', runnersController.getLoginUrl)
router.get('/oauthcallback', runnersController.oauthcallback)
router.get('/profile', authenticate, runnersController.getRunnerProfile)
router.get('/currentOrder', authenticate, runnersController.getCurrentOrder)
router.get('/pastOrders', authenticate, runnersController.getPastOrders)
router.get('/takeorder', authenticate, runnersController.takeOrder)
router.get('/fullfillorder', authenticate, runnersController.fullfillOrder)

module.exports = router
