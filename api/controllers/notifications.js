const webPush = require('web-push')
const Subscription = require('../models/notificationSubscription')
const Users = require('../models/users')
const Runner = require('../models/runners')

const baseUrlBE = process.env.baseUrlFE
const vapidPub = process.env.vapidPub
const vapidPri = process.env.vapidPri

module.exports = {
  getPublicVapidKey,
  subscribe,
  notifyRunner,
  notifyUser,
  newAssignment,
  orderFulfilled,
  orderCanceled
}

webPush.setVapidDetails(
  baseUrlBE,
  vapidPub,
  vapidPri
)

async function getPublicVapidKey (req, res) {
  res.json(vapidPub)
}

async function subscribe (req, res) {
  const user = res.locals.decodedJWT.type === 'runner'
    ? await Runner.findOne({emailID: res.locals.emailID})
    : await Users.findOne({emailID: res.locals.emailID})
  void (new Subscription({
    subscription: req.body,
    userType: res.locals.decodedJWT.type,
    userID: user._id
  })).save()
  res.send(true)
  try {
    await webPush.sendNotification(req.body, '{"title":"Notifications enabled!"}')
  } catch (error) {
    console.log(error)
  }
}

async function notifyRunner (runnerID, notification) {
  const subscriptions = await Subscription.find({userType: 'runner', userID: runnerID})
  subscriptions.map(subs => {
    try {
      webPush.sendNotification(subs.subscription, JSON.stringify(notification))
    } catch (e) {
      console.log('no Noti')
    }
  })
}

async function notifyUser (userID, notification) {
  const subscriptions = await Subscription.find({userType: 'user', userID: userID})
  subscriptions.map(subs => {
    try {
      webPush.sendNotification(subs.subscription, JSON.stringify(notification))
    } catch (e) {
      console.log('no Noti')
    }
  })
}

async function newAssignment (order, user, runner) {
  notifyRunner(runner._id,
    {
      title: 'new order assigned',
      body: `Order: ${order.description}`
    }
  )
  notifyUser(user._id,
    {
      title: 'Runner assigned to your order',
      body: `Order: ${order.description}\n`
    }
  )
}

async function orderFulfilled (order, user, runner) {
  notifyRunner(runner._id,
    {
      title: 'Order fulfilled',
      body: `Order: ${order.description}`
    }
  )
  notifyUser(user._id,
    {
      title: 'Order fulfilled',
      body: `Order: ${order.description}\n`
    }
  )
}

async function orderCanceled (order, user, runner) {
  notifyRunner(runner._id,
    {
      title: 'Order canceled',
      body: `Order: ${order.description}`
    }
  )
  notifyUser(user._id,
    {
      title: 'Order canceled',
      body: `Order: ${order.description}\n`
    }
  )
}
