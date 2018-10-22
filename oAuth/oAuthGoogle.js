const {google} = require('googleapis')

const baseUrlBE = process.env.baseUrlBE
const redirectURI = baseUrlBE + '/user/oauthcallback'
const oauthClientID = process.env.oauthClientID
const oauthClientSecret = process.env.oauthClientSecret

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

const oauth2Client = new google.auth.OAuth2(
  oauthClientID,
  oauthClientSecret,
  redirectURI
)

const RunnerOauth2Client = new google.auth.OAuth2(
  oauthClientID,
  oauthClientSecret,
  baseUrlBE + '/runner/oauthcallback'
)

const oauth2 = google.oauth2({
  auth: oauth2Client,
  version: 'v2'
})

const runnerOauth2 = google.oauth2({
  auth: RunnerOauth2Client,
  version: 'v2'
})

const userLoginURL = oauth2Client.generateAuthUrl({
  scope: scopes
})

const runnerLoginURL = RunnerOauth2Client.generateAuthUrl({
  scope: scopes
})

module.exports = {
  oauth2Client,
  RunnerOauth2Client,
  oauth2,
  runnerOauth2,
  userLoginURL,
  runnerLoginURL
}
