const mongoose = require('mongoose');
const Schema = require('mongoose');

var dictionarySchema = new Schema({
    name: {
        type: String
    },
    means: {
        type: String
    }
});

const dictionary = mongoose.model('dictionary', dictionarySchema);

module.exports = {dictionary};