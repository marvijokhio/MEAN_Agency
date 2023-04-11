const mongoose = require('mongoose')

const {providerSchema} = require('../schemas/provider.schemas')

// create provider model
const Provider = mongoose.model('Provider', providerSchema)

module.exports = {Provider}