const mongodb = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://moniyadav:yadavmoni0987@cluster0.hcpdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
console.log('connected to mongoose');

module.exports = { mongoose };

