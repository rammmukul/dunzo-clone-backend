const {clientCredentials} = require('../../secrets/googleOauthCredentials')
const {google} = require('googleapis')
const {privateKey} = require('../../secrets/jwtPrivateKey')
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const path = require('path')
const express = require('express')

const redirectURI = 'http://localhost:8000/user/oauthcallback'

const scopes = ['https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

const oauth2Client = new google.auth.OAuth2(
  clientCredentials.clientID,
  clientCredentials.clientSecret,
  redirectURI
)

const oauth2 = google.oauth2({
  auth: oauth2Client,
  version: 'v2'
})

const url = oauth2Client.generateAuthUrl({
  scope: scopes
})

function handleHomePageRequest (req, res, next) {
  if (req.isSignedIn) {
    serveOrdersPage(req, res)
  } else {
    next()
  }
}

function serveOrdersPage (req, res) {
  if (req.isSignedIn) {
    res.status(200).sendFile(path.join(__dirname.slice(0, -15), 'views', 'orders', 'orders.html'))
  }
}

function placeOrder (req, res) {
  if (req.isSignedIn) {
    res.status(200).json({ message: 'you can place your order' })
  } else {
    res.status(401).json({ message: 'looks like you are not signed in, please sign in to continue', link: url })
  }
}

async function getToken (req, res) {
  try {
    let tokenObj = await oauth2Client.getToken(req.query.code)
    oauth2Client.setCredentials(tokenObj.tokens)
    oauth2.userinfo.v2.me.get((error, info) => { handleUserInfo(error, info, req, res) })
  } catch (error) {
    console.log(error)
  }
}

async function handleUserInfo (error, info, req, res) {
  if (error) {
    console.error(error)
  } else {
    console.log(info.data)
    let token = jwt.sign({name: info.data.name, email: info.data.email}, privateKey)
    let result = await handleUserRecord(info.data, token)
    res.cookie('access_token', token, { httpOnly: true })
    //  res.status(200).json(result)
    if (result) {
      let dirname = __dirname.slice(0, -15)
      res.sendFile(path.join(dirname, 'views', 'redirection', 'redirection.html'))
      //  res.status(200).json({message: 'login successful'})
    } else {
      res.status(500).json({message: 'login not successful'})
    }
  }
}

async function handleUserRecord (userinfo, token) {
  try {
    let dbSearchResult = (await User.findOne({ emailID: userinfo.email }).exec())
    if (!dbSearchResult) {
      let user = new User({
        name: userinfo.name,
        emailID: userinfo.email,
        profilePicture: userinfo.picture,
        jwt: token
      })
      let result = await user.save()
      console.log(result)
      return true
    }
    await User.update({ emailID: userinfo.email }, { jwt: token, recentSignedIn: Date.now() })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

async function signout (req, res) {
  if (req.isSignedIn) {
    let deletion = await deleteJWTValue(req.emailID)
    if (deletion) {
      res.clearCookie('access_token', { path: '/' })
      res.status(200).json({ message: 'you have been logged out successfully, to login please click on the link', link: url })
    }
    res.status(500).json({ message: 'logged out operation was unsuccessfull' })
  } else {
    res.status(401).json({ message: 'you are not logged in and you can login by clicking on the link', link: url })
  }
}

async function deleteJWTValue (emailID) {
  try {
    await User.update({ emailID: emailID }, { jwt: null })
    return true
  } catch (error) {
    return false
  }
}

module.exports = { getToken, placeOrder, url, signout, handleHomePageRequest, serveOrdersPage }
