require('dotenv').config();
const auth0 = require('auth0');

const username = process.argv[2];
const password = process.argv[3];

const auth0Client = new auth0.AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

auth0Client.oauth.passwordGrant({
  username,
  password,
  realm: 'Username-Password-Authentication'
}).then(success => {
  console.log('SUCCESS: ', success);
}).catch(err => {
  console.log('ERROR: ', err);
});