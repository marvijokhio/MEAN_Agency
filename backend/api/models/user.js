const mongoose = require('mongoose')

const {UserSchema} = require('../schemas/user.schema')

// create user model
const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel;