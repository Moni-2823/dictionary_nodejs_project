const {Schema, model} = require('mongoose');

var undefinedWordFolder = new Schema({
    word: {
        type: String
    }
})

const undefinedWordModel = model('undefindWordModel', undefinedWordFolder);

module.exports = { undefinedWordModel }