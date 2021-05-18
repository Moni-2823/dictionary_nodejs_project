const {dictionary} = require('../../database/models/dictionaryModel');

// save data to DB
function savingDataToDatabase(input) {
    var freeCostDictionary = new dictionary(input)
    return new Promise((resolve, reject) => {
        freeCostDictionary.save().then((data) => {
            console.log('data inserted sucessfully',data);
            resolve(data)
        }).catch((err) => {
            console.log('error found', err);
            reject()
        })
    }) 
}

module.exports = { savingDataToDatabase }