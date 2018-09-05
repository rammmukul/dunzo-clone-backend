const jwt = require('jsonwebtoken')
const User = require('../api/models/users')
const Runner = require('../api/models/runners')
const { privateKey } = require('../secrets/jwtPrivateKey')

async function authenticate (req, res, next) {
  try {
    let decodedJWT = jwt.verify(req.cookies.access_token, privateKey)
    req.jwt = await checkForJWT(decodedJWT, req.cookies.access_token)
    console.log('req.jwt', req.jwt)
    req.emailID = decodedJWT.email
  } catch (error) {
    req.jwt = false
    next(Error('not signed in'))
  }
  next()
}

async function checkForJWT (userinfo, jwToken) {
  try {
    let searchResult =
      await User.findOne({ emailID: userinfo.email }).exec() ||
      await Runner.findOne({ emailID: userinfo.email }).exec()
    if (searchResult) {
      return jwToken
    }
    return false
  } catch (error) {
    console.log(error)
  }
}

module.exports = { authenticate }
