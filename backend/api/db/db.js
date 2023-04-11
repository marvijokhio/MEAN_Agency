const mongoose = require('mongoose')
const {Provider} = require('../models/provider')


// connection uri to mongodb
const uri = 'mongodb://127.0.0.1:27017/provider_db'

// make  db connection (async...ly)
module.exports = mongoose.connect(uri)
    .then( result => {
        console.log('Successful conneciton!')
    })
    .catch(error => console.log(error))

module.exports = {Provider}
