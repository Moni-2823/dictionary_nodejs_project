const axios = require('axios');

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

module.exports = { secondaryApiPromice }