const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { savingDataToDatabase } = require('./addOnFunctions/savingDataToDb');
const { secondaryApiPromice } = require('./addOnFunctions/hitGoogleDictionaryApi');
const { serchingWordInDb } = require('./addOnFunctions/findDataFromDatabase');
const { signUpModel } = require('./../database/models/userSignUpModel');
var mongoose = require('./../database/server')
var { createJwt } = require('./addOnFunctions/jwt')
var {verifyAuth} = require('./addOnFunctions/middleWareToCheckAuth')
var { hashing,comparingHashPassword } = require('./addOnFunctions/hashing')

var options = require('./../cors/corsExeption');
const { dictionary } = require('../database/models/dictionaryModel');

var port = process.env.PORT || 3000;
var app = express();
// app.use(bodyParser.urlencoded({ extended: false}))
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

app.post('/userSignUp',(req, res) => {
    let userDetails = req.body
    let token = createJwt(userDetails.password)
    userDetails.token = token
    hashing(userDetails.password).then((hash) => {
        userDetails.password = hash
        console.log('----', userDetails)
        var userDetailsToSignUp = new signUpModel(userDetails)
        
        // savetoken
        userDetailsToSignUp.save().then((details) => {
            console.log('signup details saved successfully',details)
            return res.status(200).send({msg:'details saved', details})
        }).catch((err) => {
            res.status(400).send({msg:'facing to save details'});
        })
    })
})

app.post('/logInToUser',(req, res) => {
    console.log(req.body)
    signUpModel.findOne({email: req.body.email}).then((data) => {
        comparingHashPassword(req.body.password, data.password).then((result) => {
            let token = createJwt(data.password)
            console.log('details matched',result);
            return signUpModel.findOneAndUpdate({email: req.body.email}, {$set: { token }}).then((doc) => {
                console.log("updated token",doc)
                if(doc) {
                    res.status(200).send({msg: 'you have logged in sucessfully', token});
                } 
            }).catch(err => {
                console.log('token not updated',err);
            })
        }).catch(e => {
            res.status(404).send({msg: 'details not matched.try again'})
        })
    }).catch(err => {
        res.status(400).send({msg: 'eror found', err});
    })
})

//check login token res.login first
app.use(verifyAuth)


app.post('/askUserForMeaning',(req, res) => {
    console.log(req.body)
    savingDataToDatabase(req.body).then((saveStatus) => {
        console.log("saveStatus :", saveStatus)
        res.status(200).send({msg: 'thanks for your contribution'});
    }).catch( e => {
        res.status(400).send({msg: 'unable to save your meaning in dictionary, please try again'})
    })
})

app.post('/mentainRating',(req, res) => {
    dictionary.findOne({word: req.body.word}).then((doc) => {
        var ratingValueToUpdate = null; 

        if (req.body.like) {
            ratingValueToUpdate = {rating: doc.rating + 1}
        } else {
            ratingValueToUpdate = {rating: doc.rating - 1}
        }
        dictionary.findOneAndUpdate({word: doc.word}, { $set: ratingValueToUpdate }).then((result) => {
            console.log(result)
            res.status(200).send({msg: 'rating updated'});
        }).catch(e => {
            console.log('unable to update',e)
            res.status(400).send({msg: 'unable to update'});
        }) 


    })
})


app.listen(port, () => {
    console.log('server is upon port', port);
});