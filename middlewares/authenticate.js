const jwt = require('jsonwebtoken')
const User = require('../api/models/users')
const Runner = require('../api/models/runners')
const { privateKey } = require('../secrets/jwtPrivateKey')

async function authenticate (req, res, next) {
  let {baseUrl} = req
  try {
    let decodedJWT = jwt.verify(req.cookies.access_token, privateKey)
    res.locals.jwt = await checkForJWT(decodedJWT, req.cookies.access_token)
    res.locals.emailID = decodedJWT.email
    next()
  } catch (e) {
    res.locals.jwt = false
    if (baseUrl.startsWith('/runner')) {
      return res.redirect('http://localhost:8000/runner/login')
    }
    res.redirect('http://localhost:8000/user/getLoginURL')
    console.log(e)
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
    throw Error('jwt not in db')
  }
}

module.exports = { authenticate }
