const jwt = require('jsonwebtoken')
const User = require('../api/models/users')
const Runner = require('../api/models/runners')

const privateKey = process.env.jwtPrivateKey
const baseUrlFE = process.env.baseUrlFE

async function authenticate (req, res, next) {
  try {
    let decodedJWT = jwt.verify(req.cookies.access_token || req.headers.authorization, privateKey)
    res.locals.jwt = await checkForJWT(decodedJWT, req.cookies.access_token || req.headers.authorization)
    res.locals.emailID = decodedJWT.email
    res.locals.decodedJWT = decodedJWT
    next()
  } catch (e) {
    res.locals.jwt = false
    if (req.baseUrl.startsWith('/runner')) {
      return res.redirect(baseUrlFE + '/runner.html#/login')
    }
    res.redirect(baseUrlFE + '/user.html#/login')
    console.log('NOT Authenticated', e)
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
