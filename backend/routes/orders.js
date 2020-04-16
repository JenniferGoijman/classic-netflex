const router = require('express').Router();
const OrderController = require('../controllers/OrderController.js');
const {authentication} = require('../middleware/authentication')

router.get('/user', authentication, OrderController.getByUser);
router.get('/', OrderController.getAll);
router.post('/', authentication, OrderController.insert);

module.exports = router;