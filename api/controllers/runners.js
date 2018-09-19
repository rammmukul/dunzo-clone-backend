const JWT = require('jsonwebtoken')
const Runner = require('../models/runners')
const Order = require('../models/orders')
const { privateKey } = require('../../secrets/jwtPrivateKey')
const { RunnerOauth2Client, runnerOauth2, runnerLoginURL } = require('../../oAuth/oAuthGoogle')

async function getAccessToken (code) {
  try {
    let tokenObj = await RunnerOauth2Client.getToken(code)
    return tokenObj
  } catch (e) {
    return null
  }
}

function getRunnerInfo () {
  return new Promise((resolve, reject) => {
    runnerOauth2.userinfo.v2.me.get((error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}

async function handleRunnerRecord (runnerInfo, token) {
  try {
    let dbSearchResult = await Runner.findOne({ emailID: runnerInfo.email }).exec()
    if (!dbSearchResult) {
      let runner = new Runner({
        name: runnerInfo.name,
        emailID: runnerInfo.email,
        profilePicture: runnerInfo.picture,
        jwt: [token]
      })
      return (await runner.save())
    }
    return (await Runner.findOneAndUpdate({ emailID: runnerInfo.email }, { $push: {jwt: token}, recentSignedIn: Date.now() }))
  } catch (error) {
    return new Error(error)
  }
}

async function deleteJWTValue (emailID, jwt) {
  try {
    let dbSearchResult = await Runner.findOne({ emailID }).exec()
    await Runner.findOneAndUpdate({ emailID }, { jwt: dbSearchResult.jwt.filter(e => e !== jwt) })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

async function takeNewOrder (runner) {
  try {
  const order = await Order.findOneAndUpdate(
    {status: 'placed'},
    {status: 'assigned', runner: runner._id}
  )
  await Runner.findOneAndUpdate(
    {_id: runner._id},
    {currentOrder: order._id}
  )
  } catch (e) {
    console.log('no new order')
  }
}

module.exports = {
  async getRunnerProfile (req, res) {
    res.send(await Runner.findOne({emailID: res.locals.emailID}))
  },
  async getCurrentOrder (req, res) {
    const runner = await Runner
      .findOne({emailID: res.locals.emailID})
      .populate('currentOrder')
    res.send(runner.currentOrder)
  },
  async getPastOrders (req, res) {
    const runner = await Runner
      .findOne({emailID: res.locals.emailID})
      .populate('pastOrders')
    res.send(runner.pastOrders)
  },
  getLoginUrl (req, res) {
    res.json({url: runnerLoginURL})
  },
  async oauthcallback (req, res) {
    let tokenObj = await getAccessToken(req.query.code)
    try {
      RunnerOauth2Client.setCredentials(tokenObj.tokens)
      let runnerInfo = await getRunnerInfo().catch(console.log)
      let jwt = JWT.sign(
        {
          name: runnerInfo.data.name,
          email: runnerInfo.data.email,
          type: 'runner'
        },
        privateKey
      )
      const runner = await handleRunnerRecord(runnerInfo.data, jwt)
      res.cookie('access_token', jwt)
      res.redirect('http://localhost:8080/runner.html')
      takeNewOrder(runner)
    } catch (e) {
      return res.redirect('http://localhost:8080/runner.html#/login')
    }
  },
  async signoutRunner (req, res) {
    if (res.locals.jwt) {
      let deletion = await deleteJWTValue(res.locals.emailID, res.locals.jwt)
      if (deletion) {
        res.clearCookie('access_token')
        res.redirect('http://localhost:8080/runner.html#/login')
      } else {
        res.status(500).json({ message: 'logged out operation was unsuccessfull' })
      }
    } else {
      res.redirect('http://localhost:8080/runner.html#/login')
    }
  },
  async takeOrder (req, res) {
    const result = await Runner.findOneAndUpdate(
      {
        emailID: res.locals.emailID,
        currentOrder: null
      },
      {
        currentOrder: req.body.orderID
      }
    )
    res.json(result)
  },
  async fulfillOrder (req, res) {
    const runner = await Runner.findOne({
      emailID: res.locals.emailID,
      currentOrder: req.body.orderID
    })
    if (!runner) {
      return res.json({error: 'order not assigned to you or allready fulfilled'})
    }
    await Runner.findOneAndUpdate(
      {emailID: res.locals.emailID},
      {
        currentOrder: null,
        pastOrders: [...runner.pastOrders, runner.currentOrder]
      }
    )
    const result = await Order.findOneAndUpdate(
      {_id: runner.currentOrder},
      {status: 'fulfilled'}
    )
    res.json(result)
    takeNewOrder(runner)
  },
  redirectToCurrentOrder (req, res) {
    res.redirect('http://localhost:8080/runner.html#/showcurrentassignment')
  }
}
