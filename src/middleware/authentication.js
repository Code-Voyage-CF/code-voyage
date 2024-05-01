'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');

let username = 'Ahmed'
let password = 'Test123'

let basicCredentials = `${username}:${password}`;
console.log(basicCredentials);

let encodedCredentials = base64.encode(basicCredentials);
console.log('Encoded credentials', encodedCredentials);

let decodedCredentials = base64.decode(encodedCredentials);

let [un, pass] = basicCredentials.split(":");

bcrypt.hash(pass, 15).then(hashedPassword => {
    console.log("Hashed password:", hashedPassword)
    
    bcrypt.compare('supersecret', hashedPassword).then(bool => {
        console.log('Do the passwords match?', bool);
      });
})