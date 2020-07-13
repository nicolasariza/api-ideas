const { sign } = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Se firma el token y se le pone un tiempo de expiracion de 4 horas

module.exports.generateToken = function(user){
    return sign({ user }, JWT_SECRET, { expiresIn: '4h'});
}