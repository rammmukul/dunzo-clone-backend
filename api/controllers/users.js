const jwt = require('jsonwebtoken')
const User = require('../models/users')
const Order = require('../models/orders')
const Runner = require('../models/runners')
const { privateKey } = require('../../secrets/jwtPrivateKey')
const { oauth2Client, oauth2, userLoginURL } = require('../../oAuth/oAuthGoogle')

async function placeOrder (req, res) {
  const orderBody = {
    description: req.body.description,
    from: Array.isArray(req.body.from)
      ? {coordinates: req.body.from}
      : req.body.from,
    to: Array.isArray(req.body.to)
      ? {coordinates: req.body.to}
      : req.body.to
  }
  try {
    let order = new Order({
      ...orderBody,
      user: (await User.findOne({ emailID: res.locals.emailID }).exec())._id
    })
    const placed = await order.save()
    const assigned = await assignRunner(order)
    res.json({placed, assigned})
  } catch (e) {
    console.error('err0r:', e)
    res.json(false)
    // send message to user that order didn't get placed
  }
}

async function assignRunner (order) {
  try {
    const runner = await Runner.findOneAndUpdate(
      {currentOrder: null},
      {currentOrder: order.id}
    )
      .where('location')
      .near({center: order.from.coordinates, spherical: true})
    await Order.update(
      {_id: order.id},
      {status: 'assigned', runner: runner._id}
    )
    return runner
  } catch (e) {
    console.log(e)
    return false
  }
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
      res.json('login successful')
    }
  } catch (error) {
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
    return (await User.update({ emailID: userinfo.email }, { $push: {jwt: token}, recentSignedIn: Date.now() }))
  } catch (error) {
    return new Error(error)
  }
}

async function signoutUser (req, res) {
  if (res.locals.jwt) {
    let deletion = await deleteJWTValue(res.locals.emailID, res.locals.jwt)
    if (deletion) {
      res.clearCookie('access_token', { path: '/' })
      res.status(200).json({ message: 'you have been logged out successfully, to login please click on the link', link: userLoginURL })
    } else {
      res.status(500).json({ message: 'logged out operation was unsuccessfull' })
    }
  } else {
    res.status(401).json({ message: 'you are not logged in and you can login by clicking on the link', link: userLoginURL })
  }
}

async function deleteJWTValue (emailID, jwt) {
  try {
    let dbSearchResult = await User.findOne({ emailID }).exec()
    await User.update({ emailID }, { jwt: dbSearchResult.jwt.filter(e => e !== jwt) })
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
  getUserProfile
}
