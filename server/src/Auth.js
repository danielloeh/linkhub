'use strict';
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const validateAuthToken = ({ AUTH_SERVER_URI = 'http://localhost:3333' }) => {
  return jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${AUTH_SERVER_URI}/.well-known/jwks.json`,
    }),

    // Validate the audience and the issuer.
    audience: `https://${AUTH_SERVER_URI}/api/v2/`,
    issuer: `https://${AUTH_SERVER_URI}/`,
    algorithms: ['RS256'],
  });
};

const validateIDToken = ({ AUTH_SERVER_URI = 'http://localhost:3333', AUTH_CLIENT_ID }) => {
  return jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${AUTH_SERVER_URI}/.well-known/jwks.json`,
    }),

    getToken: function getIDToken (req) {
      if (req.headers.idtoken) {
        return req.headers.idtoken;
      } else {
        console.log('no id-token found');
      }
      return null;
    },

    audience: `${AUTH_CLIENT_ID}`,
    issuer: `https://${AUTH_SERVER_URI}/`,
    algorithms: ['RS256'],
  });
};

module.exports = { validateAuthToken, validateIDToken };