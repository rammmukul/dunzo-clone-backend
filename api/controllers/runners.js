const JWT = require('jsonwebtoken')
const Runner = require('../models/runners')
const { privateKey } = require('../../secrets/jwtPrivateKey')
const { oauth2Client, oauth2, runnerLoginURL } = require('../../oAuth/oAuthGoogle')

async function getAccessToken (code) {
  try {
    let tokenObj = await oauth2Client.getToken(code)
    return tokenObj
  } catch (error) {
    return null
  }
}

function getRunnerInfo () {
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

async function handleRunnerRecord (runnerInfo, token) {
  try {
    let dbSearchResult = await Runner.findOne({ emailID: runnerInfo.email }).exec()
    if (!dbSearchResult.jwt.includes(token)) {
      dbSearchResult.jwt.push(token)
      let runner = new Runner({
        name: runnerInfo.name,
        emailID: runnerInfo.email,
        profilePicture: runnerInfo.picture,
        jwt: dbSearchResult.jwt
      })
      return (await runner.save())
    }
    return (await Runner.update({ emailID: runnerInfo.email }, { jwt: dbSearchResult.jwt, recentSignedIn: Date.now() }))
  } catch (error) {
    return new Error(error)
  }
}

module.exports = {
  async getRunnerProfile (req, res) {
    res.send(await Runner.findOne({emailID: req.locals.emailID}))
  },
  async getCurrentOrder (req, res) {
    const runner = await Runner
      .findOne({emailID: req.locals.emailID})
      .populate('currentOrder')
    res.send(runner.currentOrder)
  },
  async getPastOrders (req, res) {
    const runner = await Runner
      .findOne({emailID: req.locals.emailID})
      .populate('pastOrders')
    res.send(runner.pastOrders)
  },
  getLoginUrl (req, res) {
    res.json({url: runnerLoginURL})
  },
  async oauthcallback (req, res) {
    let tokenObj = await getAccessToken(req.query.code)
    try {
      oauth2Client.setCredentials(tokenObj.tokens)
      let runnerInfo = await getRunnerInfo()
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
      {emailID: req.locals.emailID},
      {
        currentOrder: req.body.orderID
      }
    )
    res.json(result)
  },
  async fullfillOrder (req, res) {
    const runner = await Runner.findOne({emailID: req.locals.emailID})
    const result = await Runner.update(
      {emailID: req.locals.emailID},
      {
        currentOrder: null,
        pastOrders: [...runner.pastOrders, runner.currentOrder]
      }
    )
    res.json(result)
  }
}
