const notificationControler = require('../controllers/notifications')
const router = require('express').Router()
const { authenticate } = require('../../middlewares/authenticate')

router.post('/subscribe', authenticate, notificationControler.subscribe)
router.get('/publicVapidKey', notificationControler.getPublicVapidKey)

module.exports = router
