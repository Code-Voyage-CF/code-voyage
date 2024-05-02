'use strict';

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

<<<<<<< HEAD
=======
function verifyUser(request, response, next) {

  function valid(err, user) {
    if (err) {
      next(err);
    }
    request.user = user;
    next();
  }

  try {
    const token = request.headers.authorization.split(' ')[1];
    jwt.verify(token, getKey, {}, valid);
  } catch (e) {
    next('Not Authorized');
  }
}

>>>>>>> 0c28290f5a133a4dea36c131633ed49426093d78
const client = jwksClient({
  jwksUri: process.env.JWKS_URI,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err, null);
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    }
  });
}

function verifyUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization token provided.' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, getKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token.' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyUser;