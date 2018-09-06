const jwt = require('jsonwebtoken')
const User = require('../api/models/users')
const Runner = require('../api/models/runners')
const { privateKey } = require('../secrets/jwtPrivateKey')

async function authenticate (req, res, next) {
  try {
    let decodedJWT = jwt.verify(req.cookies.access_token, privateKey)
    req.locals.jwt = await checkForJWT(decodedJWT, req.cookies.access_token)
    console.log('req.locals.jwt', req.locals.jwt)
    req.locals.emailID = decodedJWT.email
  } catch (error) {
    req.locals.jwt = false
    next(Error('not signed in'))
  }
  next()
}

async function checkForJWT (userinfo, jwToken) {
  try {
    let searchResult =
      await User.findOne({ emailID: userinfo.email }).exec() ||
      await Runner.findOne({ emailID: userinfo.email }).exec()
    if (searchResult && searchResult.jwt.includes(jwToken)) {
      return jwToken
    }
    return false
  } catch (error) {
    console.log(error)
  }
}

module.exports = { authenticate }
