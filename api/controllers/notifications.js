const webPush = require('web-push')
const vapidKeys = require('../../secrets/vapidKeys')
const Subscription = require('../models/notificationSubscription')
const Users = require('../models/users')
const Runner = require('../models/runners')

webPush.setVapidDetails(
  'http://localhost:8000',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

module.exports = {
  getPublicVapidKey (req, res) {
    res.json(vapidKeys.publicKey)
  },
  async subscribe (req, res) {
    console.log(res.locals.decodedJWT, 'notification subscription', req.body.subscription)
    const user = res.locals.decodedJWT.type === 'runner'
      ? await Runner.findOne({emailID: res.locals.emailID})
      : await Users.findOne({emailID: res.locals.emailID})
    void (new Subscription({
      subscription: req.body.subscription,
      userType: res.locals.decodedJWT.type,
      userID: user._id
    })).save()
    res.send(true)
    try {
      await webPush.sendNotification(req.body.subscription, '"yay!!!!!!!!"')
    } catch (error) {
      console.log(error)
    }
  }
}
