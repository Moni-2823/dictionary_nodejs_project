// const MongoClient = require('mongodb');

// MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, (err, client) => {
//     if(err) {
//         console.log('unable to connected mongodb');
//     }
//     var db = client.db('freeOfCostDictionary');
//     console.log('connected to mongodb');
// });


const mongodb = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/freeDictionary', {useNewUrlParser: true}, {useUnifiedTopology: true})
console.log('connected to mongoose');

module.exports = { mongoose };

