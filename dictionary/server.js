const express = require('express');
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');

const {mongoose} = require('./../database/server');
const {dictionary} = require('./../models/model');

var app =   express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


    app.post('/createDictionaryPage',(req, res) => {
//         insert many {} direct Object nhi leta hai [{}]
//  ke andar leta hai to zaroori hai lagana []

// hehahehahehahehaheha ghoonghroo toot gayeee
        db.collection('dictionaryCollection').insertMany([req.body], (err, document) => {
            if(err) {
                console.log('unable to insert data',err);
            }
            console.log("data saved",document);
            res.send({msg: 'inserted doucment is::',data: document});
        })
    })

// finding data from collection
    app.get('/searchingInDatabase', (req, res) => {
        db.collection('dictionaryCollection').find().toArray().then((data) => {
            if(!data) {
               return console.log('empty data found');
            }
            console.log('data is here,,,',data);
            res.send({msg: 'fetched data is:::', result: data});
        }, (err) => {
            console.log('error found',err);
        })
    })
 


app.listen(3000, () => {
    console.log('server is upon port 3000');
});