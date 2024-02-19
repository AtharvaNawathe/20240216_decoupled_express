// routes.js
const express = require('express');
const bodyParser = require('body-parser');
const { createProduct, insertProduct, deleteProduct, getProductById, checkout, cancelOrder } = require('./jsonwala');
// const { createProduct, insertProduct , deleteProduct, checkout, cancelOrder, getProductById} = require('./mongowala');

const router = express.Router();
router.use(bodyParser.json());

router.post('/createProduct', createProduct);
router.post('/insertProduct', insertProduct);
router.delete('/deleteProduct', deleteProduct);
router.get('/getProductById/:id', getProductById);
router.post('/checkout', checkout);
router.delete('/cancelOrder', cancelOrder);
module.exports = router;
