const jwt = require('jsonwebtoken')
const User = require('../api/models/users')
const Runner = require('../api/models/runners')
const { privateKey } = require('../secrets/jwtPrivateKey')

async function authenticate (req, res, next) {
  let {baseUrl} = req
  let userType = baseUrl.startsWith('/runner') ? 'runner' : 'user'
  try {
    let decodedJWT = jwt.verify(req.cookies.access_token || req.headers.authorization, privateKey)
    if (userType !== decodedJWT.type) {
      userType = decodedJWT.type
      throw Error('jwt is for diffrent type of user')
    }
    res.locals.jwt = await checkForJWT(decodedJWT, req.cookies.access_token || req.headers.authorization)
    res.locals.emailID = decodedJWT.email
    next()
  } catch (e) {
    res.locals.jwt = false
    if (userType === 'runner') {
      return res.redirect('http://localhost:8080/runner.html#/login')
    }
    res.redirect('http://localhost:8080/login')
    console.log(e)
  }
}

async function checkForJWT (userinfo, jwToken) {
  try {
    let searchResult =
      userinfo.type === 'user'
        ? await User.findOne({ emailID: userinfo.email }).exec()
        : await Runner.findOne({ emailID: userinfo.email }).exec()
    if (searchResult && searchResult.jwt.includes(jwToken)) {
      return jwToken
    }
  } catch (error) {
    console.log(error)
    throw Error('jwt not in db')
  }
}

module.exports = { authenticate }
