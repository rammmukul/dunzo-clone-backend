const jwt = require('jsonwebtoken')
const User = require('../api/models/users')
const Runner = require('../api/models/runners')
const { privateKey } = require('../secrets/jwtPrivateKey')

async function authenticate (req, res, next) {
  try {
    let decodedJWT = jwt.verify(req.cookies.access_token, privateKey)
    req.isSignedIn = await checkForJWT(decodedJWT, req.cookies.access_token)
    req.emailID = decodedJWT.email
  } catch (error) {
    req.isSignedIn = false
  }
  next()
}

async function checkForJWT (userinfo, jwToken) {
  try {
    let searchResult =
      await User.findOne({ emailID: userinfo.email }).exec() ||
      await Runner.findOne({ emailID: userinfo.email }).exec()
    if (searchResult && searchResult.jwt === jwToken) {
      return true
    }
    return false
  } catch (error) {
    console.log(error)
  }
}

module.exports = { authenticate }
