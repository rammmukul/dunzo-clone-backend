const {google} = require('googleapis')
const {clientCredentials} = require('../secrets/googleOauthCredentials')

const redirectURI = 'http://localhost:8000/user/oauthcallback'

const scopes = [
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

const userLoginURL = oauth2Client.generateAuthUrl({
  scope: scopes
})

const runnerLoginURL = oauth2Client.generateAuthUrl({
  scope: scopes,
  redirect_uri: 'http://localhost:8000/runner/oauthcallback'
})

module.exports = {
  oauth2Client,
  oauth2,
  userLoginURL,
  runnerLoginURL
}
