const {Schema, model} = require('mongoose');

var signUpToUser = new Schema({
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
    mobile_no: {
        type: Number
    },
    email: {
        type: String,
        // unique: true,
        require: true
    },
    token: {
        type: String
    }
});

const signUpModel = model('signUpModel', signUpToUser);

module.exports = {signUpModel};