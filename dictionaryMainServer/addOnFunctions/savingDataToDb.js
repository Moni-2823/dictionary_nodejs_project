const {dictionary} = require('./../../database/models/model');

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

module.exports = { savingDataToDatabase }