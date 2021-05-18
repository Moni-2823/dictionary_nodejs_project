var bcrypt = require('bcrypt');

var saltRounds = 5;
var salt = "dora"; 

function  hashing (myPlaintextPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                if (err) {
                    return reject()
                }
                console.log('hash o/p',hash)
                resolve(hash)
            });
        });
    })
}   

function comparingHashPassword(myPlaintextPassword, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
            if(err) {
                return console.log('some problem with hasing')
            }
            if (result) {
                console.log('pass matched')
                return resolve();
            }
            reject()
        });
    })
}

    

module.exports = { hashing, comparingHashPassword };
