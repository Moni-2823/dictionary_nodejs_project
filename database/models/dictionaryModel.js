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
    },
    rating: {
        type: Number,
        max: 10,
        min: 0,
        default: 10
    }
});

const dictionary = model('dictionary', dictionarySchema);

module.exports = {dictionary};