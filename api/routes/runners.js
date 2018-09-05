const router = require('express').Router()
const urlEncodedParser = require('body-parser').urlencoded({ extended: false })
const runnersController = require('../controllers/runners')
const { authenticate } = require('../../middlewares/authenticate')

router.get('/profile', authenticate, runnersController.getRunnerProfile)
router.get('/currentOrder', authenticate, runnersController.getCurrentOrder)
router.get('/pastOrders', authenticate, runnersController.getPastOrders)
router.get('/login', authenticate, runnersController.getLoginUrl)
router.get('/oauthcallback', authenticate, runnersController.oauthcallback)

module.exports = router
