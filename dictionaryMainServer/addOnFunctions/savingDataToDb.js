const {dictionary} = require('./../../database/models/model');

// save data to DB
function savingDataToDatabase(input) {
    var freeCostDictionary = new dictionary(input)
    return freeCostDictionary.save().then((data) => {
        if(!data) {
            console.log('data not saved');
            return false
        }
        console.log('data inserted sucessfully',data);
        return true
    }).catch((err) => {
        console.log('error found', err);
        return false
    })
}

module.exports = { savingDataToDatabase }