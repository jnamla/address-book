/**
 * Token validation service
 *
 * @description :: JSON Webtoken Service for token validation
 */
var jwt = require('jsonwebtoken');

var config = require('../bin/config');

// Verifies token on a request
module.exports = function(req, res, next) {
 
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
 
  if (token) {
    try {
      var decoded = jwt.decode(token, config.secretKey);
 
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
    }
    
    req.body.temp.admin = decoded.id;
    
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};