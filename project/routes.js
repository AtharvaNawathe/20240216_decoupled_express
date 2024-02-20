// routes.js
const express = require('express');
const bodyParser = require('body-parser');
// const { createProduct, insertProduct, deleteProduct, getProductById, createOrder, cancelOrder,updateProduct,checkout } = require('./jsonwala');
const { createProduct, insertProduct , deleteProduct,updateProduct, createOrder, cancelOrder, getProductById, checkout} = require('./mongowala');

const router = express.Router();
router.use(bodyParser.json());

router.post('/createProduct', createProduct);
router.post('/insertProduct', insertProduct);
router.delete('/deleteProduct', deleteProduct);
router.get('/getProductById/:id', getProductById);
router.post('/createOrder', createOrder);
router.delete('/cancelOrder', cancelOrder);
router.put('/updateProduct/:id', updateProduct);
router.post('/checkout', checkout);
module.exports = router;
