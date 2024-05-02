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
    realm: 'Username-Password-Authentication'
  })
  .then(success => {
    console.log('Token:', success);
    res.json({ success: true, token: success.access_token, idToken: success.id_token });
  })
  .catch(err => {
    console.log('ERROR: ', err);
    res.status(401).json({ success: false, message: 'Authentication failed', error: err.message });
  });
}

module.exports = login;
