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
    dbSearchResult.jwt.push(token)
    return (await Runner.update({ emailID: runnerInfo.email }, { jwt: dbSearchResult.jwt, recentSignedIn: Date.now() }))
  } catch (error) {
    return new Error(error)
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
          email: runnerInfo.data.email
        },
        privateKey
      )
      await handleRunnerRecord(runnerInfo.data, jwt)
      res.cookie('access_token', jwt)
      res.json('signedIn')
    } catch (e) {
      res.json('not signedIn')
    }
  },
  async takeOrder (req, res) {
    const result = await Runner.update(
      {emailID: res.locals.emailID},
      {
        currentOrder: req.body.orderID
      }
    )
    res.json(result)
  },
  async fulfillOrder (req, res) {
    const runner = await Runner.findOne({emailID: res.locals.emailID})
    if (runner.currentOrder !== req.body.orderID) {
      return res.json({error: 'orderID does not match your assigned order'})
    }
    const result = await Runner.update(
      {emailID: res.locals.emailID},
      {
        currentOrder: null,
        pastOrders: [...runner.pastOrders, runner.currentOrder]
      }
    )
    await Order.update(
      {_id: runner.currentOrder},
      {status: 'fulfilled'}
    )
    res.json(result)
  }
}
