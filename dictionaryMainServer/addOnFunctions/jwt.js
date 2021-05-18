const jwt = require('jsonwebtoken');

var secretKey = "parrot@998877"
var createJwt = (pass) => {
    return jwt.sign({ password: pass }, secretKey)
}

module.exports = {createJwt}