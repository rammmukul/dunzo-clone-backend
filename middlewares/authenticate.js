const jwt = require('jsonwebtoken')
const User = require('../api/models/users')
const Runner = require('../api/models/runners')
const { privateKey } = require('../secrets/jwtPrivateKey')

async function authenticate (req, res, next) {
  let {baseUrl} = req
  try {
    let decodedJWT = jwt.verify(req.cookies.access_token, privateKey)
    req.locals = {
      ...req.locals,
      jwt: await checkForJWT(decodedJWT, req.cookies.access_token)
    }
    console.log('req.locals.jwt', req.locals.jwt)
    req.locals.emailID = decodedJWT.email
    next()
  } catch (error) {
    req.locals = {
      ...req.locals,
      jwt: false
    }
    if (baseUrl.startsWith('/runner')) {
      return res.redirect('http://localhost:8000/runner/login')
    }
    res.redirect('http://localhost:8000/user/getLoginURL')
  }
}

async function checkForJWT (userinfo, jwToken) {
  try {
    let searchResult =
      await User.findOne({ emailID: userinfo.email }).exec() ||
      await Runner.findOne({ emailID: userinfo.email }).exec()
    console.log('searchResult', searchResult)
    if (searchResult && searchResult.jwt.includes(jwToken)) {
      return jwToken
    }
  } catch (error) {
    console.log(error)
  }
  return false
}

module.exports = { authenticate }
