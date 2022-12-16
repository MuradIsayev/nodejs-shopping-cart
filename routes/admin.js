const express = require('express');
const router = express.Router();
const path = require('path');
const dirName = require('../Helper/path');

const adminController = require('../controllers/admin');

//  /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);
/* Don't add parenthesis in the end. Because we don't execute this function, 
   we just pass a reference to this function.
   We just telling express router that, take this function and store it and whenever
   request reaches this route execute it.
*/

// /admin/products => GET
router.get('/products', adminController.getProducts);
//  /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);
// When we have different methods, path can be repeated.

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;



