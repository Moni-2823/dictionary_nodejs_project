const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { savingDataToDatabase } = require('./addOnFunctions/savingDataToDb');
const { secondaryApiPromice } = require('./addOnFunctions/hitGoogleDictionaryApi');
const { serchingWordInDb } = require('./addOnFunctions/findDataFromDatabase');
var mongoose = require('./../database/server')


var options = require('../cors/corsExeption');

var port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cors(options));

//API point or end point or route
app.post('/createDictionaryPage',(req, res) => {
    console.log(req.body)
    serchingWordInDb(req.body.word).then(data => {
        if(data) {
            console.log('received data from DB',data);
            return res.status(200).send({'data': data})
        }
    }).catch ((err) => {
        secondaryApiPromice(req.body.word).then(data => {
            if(data) {
                res.status(200).send({'data':data});
                var dataStructureForDb = {
                    "word" : req.body.word,
                    "meaning" : ''
                }
                data.forEach((element) => {
                    dataStructureForDb.meaning = `${dataStructureForDb.meaning} ${element.definition}`
                });
                savingDataToDatabase(dataStructureForDb)
            }
        }).catch ((err) => {
            console.log('error in secondary api promise', err)
            res.send({msg: 'error found',error: err});
        })
    })
})

app.post('/askUserForMeaning',(req, res) => {
    console.log(req.body)
    var saveStatus = savingDataToDatabase(req.body)
    if (saveStatus) {
        return res.status(200).send({msg: 'thanks for your contribution'});
    }
    res.status(400).send({msg: 'unable to save your meaning in dictionary, please try again'})
})


app.listen(port, () => {
    console.log('server is upon port', port);
});