const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const jwtCheck = ({ AUTH_SERVER_URI = 'http://localhost:3333' }) => {
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

module.exports = jwtCheck;