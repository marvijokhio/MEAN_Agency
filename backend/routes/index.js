var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main')

/* GET home page. */
router.get('/', mainController.home)
router.get('/about', mainController.about)
router.get('/contact', mainController.contact)
router.get('/login', mainController.login)
router.get('/register', mainController.register)
router.get('/forgot-password', mainController.forgotpassword)

    
// // my try
// router.get('/logged-in', mainController.loggedin)
// router.get('/registered', mainController.registered)

// router.get('/loggedin', mainController.loggedin)


module.exports = router;
