const auth0 = require('auth0');
require('dotenv').config();

const auth0Client = new auth0.AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

function login(req, res, next) {
  const { username, password } = req.body;

  auth0Client.oauth.passwordGrant({
    username,
    password,
    realm: 'Username-Password-Authentication',
    scope: 'openid'  // Include 'openid' to ensure an ID Token is returned
  })
  .then(success => {
    console.log('Access Token:', success.data.access_token);
    console.log('ID Token:', success.data.id_token);

    res.json({
      success: true,
      token: success.access_token, // Access token
      idToken: success.id_token // ID token
    });
  })
  .catch(err => {
    console.log('ERROR: ', err);
    res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: err.message
    });
  });
}

module.exports = login;

