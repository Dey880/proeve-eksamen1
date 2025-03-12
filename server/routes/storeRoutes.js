const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');
const verifyJwt = require("../middleware/verifyToken.js")

router.post('/category', storeController.createCategory);
router.post('/product', storeController.createProduct);

router.get('/category', storeController.getAllCategory);
router.get('/product', storeController.getAllProduct);

router.get('/category/:id', storeController.getCategoryById);
router.get('/product/:id', storeController.getProductById);

router.put('/product/:id', verifyJwt, storeController.updateProduct);
router.delete('/product/:id', verifyJwt, storeController.deleteProduct);

module.exports = router;