require('dotenv').config();
const auth0 = require('auth0');

console.log(`Domain: ${process.env.AUTH0_DOMAIN}`)
console.log(`CLIENT_ID: ${process.env.AUTH0_CLIENT_ID}`)
console.log(`CLIENT_SECRET: ${process.env.AUTH0_CLIENT_SECRET}`)

const auth0Client = new auth0.AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

const email = process.argv[2];
const password = process.argv[3];

auth0Client.database.signUp({
  email,
  password,
  connection: 'Username-Password-Authentication'
}).then(response => {
  console.log('USER SIGNUP!', response);
}).catch(err => {
  console.log('SIGN UP ERROR', err);
});