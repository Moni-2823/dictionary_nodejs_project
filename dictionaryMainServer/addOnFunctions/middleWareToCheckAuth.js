var jwt = require('jsonwebtoken');

const { signUpModel } = require('./../../database/models/userSignUpModel');
const secretKey = "parrot@998877";

function verifyAuth(req, res, next) {
    if(req.body.token) {
        var istokenValid = jwt.verify(req.body.token, secretKey)
        if (istokenValid) {
            return signUpModel.findOne({token: req.body.token}).then((data) => {
                console.log("middleware auth", data)
                next()
            }).catch(e => {
                console.log('not matched', e)
                res.status(400).send()
            })
        }else {
            console.log("token maupulated")
        }
    }
    console.log('token not matched')
    res.status(400).send()
}

module.exports = { verifyAuth }