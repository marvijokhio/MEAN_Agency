var express = require('express')
var router = express.Router()

const mainController = require('../controllers/main.Controller')

// HTTP Verbs: POST , GET, UPDATE, DELETE

//Post   '/api/providers'  becuase is the /api is already included in app.js file code.
router.post('/providers/', mainController.create)

// Get /api/providers
router.get('/providers/', mainController.readAll)

//Get One  /api/providers/123
router.get('/providers/:id/', mainController.readOne)

//Put  /api/providers/123
router.put('/providers/:id/', mainController.update)

//Delete /api/providers/123
router.delete('/providers/:id/', mainController.deleteOne)

//Delete All Providers  /api/providers
router.delete('/providers/', mainController.deleteAll)

//no matching api endpoints
router.get('/*', notFound)
router.post('/*', notFound)
router.put('/*', notFound)
router.delete('/*', notFound)

function notFound(req, res) {
    res.status(400)
    res.send('Not valid endpoint.')
}

module.exports = router;
