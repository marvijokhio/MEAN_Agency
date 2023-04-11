// get some data
const {Provider} = require('../db/db')
const { ObjectId } = require('mongodb')

// Util functions

// Check if the providers list is empty
function isEmptyList(obj) {
    return (!obj || obj.length == 0 || Object.keys(obj).length == 0)
}

// handle the errors
function handleError(res, error) {
    res.status(200)
    res.send("something went wrong. \n" + error)
}

// CRUD : Create (POST), Read (GET), Update (PUT), Delete (DELETE)

// POST - Create - /api/providers
module.exports.create = function (req, res) {

    try {
        var provider = req.body //get new provider
        // provider.id = id
        Provider.create(provider)
            .then(result => {
                res.status(201)
                res.send(result)
            })
            .catch(error => handleError(res, error))

    } catch (error) {
        handleError(res, error)
    }
}

// GET - Read All - /api/providers
module.exports.readAll = function (req, res) {
    try {
        Provider.find()
            .then(result => {
                if (isEmptyList(result)) {
                    res.status(404)
                    res.send("Lsit is empty.")
                } else {
                    res.status(200)
                    res.send(result)
                }
            })
            .catch(error => handleError(res, error))

    } catch (error) {
        handleError(res, error)
    }
}

// GET - Read One - /api/providers/123
module.exports.readOne = function (req, res) {
    try {
        let id = ObjectId(req.params.id)
        Provider.find({ '_id': id })
            .then(result => {
                if (!isEmptyList(result)) {
                    res.status(200)
                    res.send(result)
                } else {
                    res.status(400)
                    res.send('Provider does not exist.')
                }
            })
            .catch(error => handleError(res, error))
    } catch (error) {
        handleError(res, error)
    }
}

// PUT - Update - /api/providers/123 
module.exports.update = function (req, res) {
    try {
        let id = ObjectId(req.params.id)
        let provider = req.body //update provider
        Provider.findOneAndUpdate({ '_id': id }, provider, { new: true })
            .then(result => {
                if (!isEmptyList(result)) {
                    res.status(200)
                    res.send(result)

                } else {
                    res.status(400)
                    res.send('List is empty. Nothing to update.')
                }
            })
            .catch(error => handleError(res, error))

    } catch (error) {
        handleError(res, error)
    }
}


// DELETE - Delete One - /api/providers/123
module.exports.deleteOne = function (req, res) {
    try {
        let id = ObjectId(req.params.id)
        Provider.findOneAndDelete({ '_id': id })
            .then(result => {
                if (!isEmptyList(result)) {
                    res.status(200)
                    res.send(result)
                } else {
                    res.status(404)
                    res.send("Provider not found. Nothing to delete.")
                }
            })
            .catch(error => handleError(res, error))
    } catch (error) {
        handleError(res, error)
    }
}

//DELETE - Delete All- /api/providers
module.exports.deleteAll = function (req, res) {
    try {
        Provider.deleteMany()
            .then(result => {
                if (result.deletedCount === 0) {
                    res.status(400)
                    res.send('Nothing to delete! List is empty.')
                }else{
                    res.status(200)
                    res.send("All Providers Deleted!")
                }
            })
            .catch(error => handleError(res, error))

    } catch (error) {
        handleError(res, error)
    }
}