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
module.exports = { serchingWordInDb }