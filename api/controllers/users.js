const jwt = require('jsonwebtoken')
const User = require('../models/users')
const Order = require('../models/orders')
const Runner = require('../models/runners')
const { RunnerEvents } = require('./runners')
const { oauth2Client, oauth2, userLoginURL } = require('../../oAuth/oAuthGoogle')
const EventEmitter = require('events')
const Notify = require('./notifications')

const privateKey = process.env.jwtPrivateKey
const baseUrlFE = process.env.baseUrlFE

const UserEvents = new EventEmitter()
UserEvents.on('runner assigned', Notify.newAssignment)

async function placeOrder (req, res) {
  const orderBody = {
    description: req.body.description,
    from: Array.isArray(req.body.from)
      ? {coordinates: req.body.from}
      : req.body.from,
    to: Array.isArray(req.body.to)
      ? {coordinates: req.body.to}
      : req.body.to,
    fromAddr: req.body.fromAddr,
    toAddr: req.body.toAddr
  }
  try {
    let order = new Order({
      ...orderBody,
      user: (await User.findOne({ emailID: res.locals.emailID }).exec())._id
    })
    await order.save()
    RunnerEvents.emit('new order', order)
    res.json({status: true})
  } catch (e) {
    console.error('err0r:', e)
    res.json({status: false})
    // send message to user that order didn't get placed
  }
}

RunnerEvents.on('new order', assignRunner)

async function assignRunner (order) {
  try {
    const runner = await Runner.findOneAndUpdate(
      {currentOrder: null},
      {currentOrder: order.id}
    )
    // .where('location')
    // .near({center: order.from.coordinates, spherical: true})
    const result = await Order.findOneAndUpdate(
      {_id: order.id},
      {status: 'assigned', runner: runner._id}
    )
    const user = result.user
    UserEvents.emit('runner assigned', order, user, runner)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

async function cancelOrder (req, res) {
  const user = await User.findOne({
    emailID: res.locals.emailID
  })
  const order = await Order.findOneAndUpdate(
    {_id: req.body.orderID, user: user._id},
    {status: 'canceled'}
  ).where('status').nin(['fulfilled', 'canceled'])
  if (!order) {
    return res.json({error: 'order not your\'s or allready fulfilled or canceled'})
  }
  const runner = await Runner.findOneAndUpdate(
    {_id: order.runner},
    {
      currentOrder: null
    }
  )
  res.json(!!order)
  RunnerEvents.emit('runner free', runner)
  Notify.orderCanceled(order, order.user, runner)
}

async function oauthcallback (req, res) {
  try {
    let tokenObj = await getAccessToken(req.query.code)
    if (tokenObj) {
      oauth2Client.setCredentials(tokenObj.tokens)
      let userInfo = await getUserInfo().catch(console.log)
      let jwToken = jwt.sign({
        name: userInfo.data.name,
        email: userInfo.data.email,
        type: 'user'
      }, privateKey)
      await handleUserRecord(userInfo.data, jwToken)
      res.cookie('access_token', jwToken)
      res.redirect(baseUrlFE + '/user.html#/placeorder')
    }
  } catch (error) {
    res.redirect(baseUrlFE + '/user.html#/login')
    console.log(error)
  }
}

async function getAccessToken (code) {
  try {
    let tokenObj = await oauth2Client.getToken(code)
    return tokenObj
  } catch (error) {
    return null
  }
}

function getUserInfo () {
  return new Promise((resolve, reject) => {
    oauth2.userinfo.v2.me.get((error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}

async function handleUserRecord (userinfo, token) {
  try {
    let dbSearchResult = await User.findOne({ emailID: userinfo.email }).exec()
    if (!dbSearchResult) {
      let user = new User({
        name: userinfo.name,
        emailID: userinfo.email,
        profilePicture: userinfo.picture,
        jwt: [token]
      })
      return (await user.save())
    }
    return (await User.findOneAndUpdate({ emailID: userinfo.email }, { $push: {jwt: token}, recentSignedIn: Date.now() }))
  } catch (error) {
    return new Error(error)
  }
}

async function signoutUser (req, res) {
  if (res.locals.jwt) {
    let deletion = await deleteJWTValue(res.locals.emailID, res.locals.jwt)
    if (deletion) {
      res.clearCookie('access_token', { path: '/' })
      res.redirect(baseUrlFE + '/user.html#/login')
    } else {
      res.status(500).json({ message: 'logged out operation was unsuccessfull' })
    }
  } else {
    res.redirect(baseUrlFE + '/user.html#/login')
  }
}

async function deleteJWTValue (emailID, jwt) {
  try {
    let dbSearchResult = await User.findOne({ emailID }).exec()
    await User.findOneAndUpdate({ emailID }, { jwt: dbSearchResult.jwt.filter(e => e !== jwt) })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

function getLoginURLAndSend (req, res) {
  res.status(200).json({url: userLoginURL})
}

async function getOrdersAndSend (req, res) {
  try {
    let orders = await Order.find().exec()
    res.json({ message: orders })
  } catch (err) {
    res.json({ message: 'no records found' })
  }
}

async function getOrderDetailsAndSend (req, res) {
  try {
    let orderDetails = await Order.findById(req.query.orderID).populate('runner')
    res.json({ details: orderDetails })
  } catch (err) {
    res.json({ message: 'no details found' })
  }
}

async function getUserProfile (req, res) {
  try {
    let user = await User.find({emailID: res.locals.emailID})
    res.json(user)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  oauthcallback,
  placeOrder,
  signoutUser,
  getLoginURLAndSend,
  getOrdersAndSend,
  getOrderDetailsAndSend,
  getUserProfile,
  UserEvents,
  cancelOrder
}
