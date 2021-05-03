// const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

var dictionarySchema = new Schema({
    word: {
        type: String,
        required: true
    },
    meaning: {
        type: String,
        required: true
    }
});

const dictionary = model('dictionary', dictionarySchema);

module.exports = {dictionary};