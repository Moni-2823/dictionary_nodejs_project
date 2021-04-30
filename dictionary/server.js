const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const cors = require('cors')

const {mongoose} = require('./../database/server');
const {dictionary} = require('./../models/model');
var options = require('../cors/corsSexeption')

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
        // res.send({msg: 'problem in Database'});
        secondaryApiPromice(req.body.word).then(data => {
            if(data) {
                res.status(200).send({'data:':data});
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

// save data to DB
function savingDataToDatabase(input) {
    var freeCostDictionary = new dictionary(input)
    freeCostDictionary.save().then((data) => {
        if(!data) {
            return console.log('data not saved');
        }
        console.log('data inserted sucessfully',data);
    }).catch((err) => {
        console.log('error found', err);
    })
}

// hit google dictionary api
function secondaryApiPromice(word) {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((result) => {
            console.log('received from dictionary ',result.data[0].meanings[0].definitions)
            resolve(result.data[0].meanings[0].definitions)
        }).catch((e) => {
            console.log(e)
            reject(e)
        })
    })
}


// finding data from collection
function serchingWordInDb(searchWord) {
    return new Promise((resolve, reject) => {
        dictionary.find({word : searchWord}).then((doc) => {
            if(!doc.length) {
                return reject (console.log('data not found', searchWord))
            }
            console.log('data founded',doc);
            resolve(doc);
        }).catch((err) => {
            reject(err);
        })
    })
}

app.listen(port, () => {
    console.log('server is upon port', port);
});