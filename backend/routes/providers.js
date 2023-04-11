var express = require('express');
var router = express.Router();
const providersController = require('../controllers/providers')

/* GET List page. */
router.get('/', providersController.list)

/* GET details page. */
router.get('/details/:id', providersController.details)

/* GET Edit page. */
router.get('/edit/:id', providersController.edit)

/* POST update page. */
router.post('/update/:id', providersController.update)
module.exports = router;

/* GET add a new provider page. */
router.get('/add-provider', providersController.addform)
module.exports = router;

/* POST add page. */
router.post('/add', providersController.add)
module.exports = router;

/* GET delete page. */
router.get('/delete/:id', providersController.delete)
module.exports = router;
