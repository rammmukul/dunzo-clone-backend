const router = require('express').Router()
const runnersController = require('../controllers/runners')
const { authenticate } = require('../../middlewares/authenticate')

router.get('/login', runnersController.getLoginUrl)
router.get('/oauthcallback', runnersController.oauthcallback)
router.get('/profile', authenticate, runnersController.getRunnerProfile)
router.get('/currentOrder', authenticate, runnersController.getCurrentOrder)
router.get('/pastOrders', authenticate, runnersController.getPastOrders)
router.post('/takeorder', authenticate, runnersController.takeOrder)
router.post('/fulfillorder', authenticate, runnersController.fulfillOrder)

module.exports = router
