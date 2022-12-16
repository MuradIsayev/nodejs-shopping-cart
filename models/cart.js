const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);
module.exports = class Cart {
    /* Cart itself is not an object we will constantly recreate. Not for every product we add 
    we want to have a new cart. Instead there always will be a cart in our app,
    and we just want to manage the products in there. So we will not use constructor()
    */
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }; // If we have an error, if no cart, create one
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id); // if true => returns prod
            // We check if the product we are trying to add already exists
            const existingProduct = cart.products[existingProductIndex]; // Allows us to use index to replace the item
            let updatedProduct;
            // Add new product and increase the quantity
            if (existingProduct) {
                // Updated product is replaced below
                updatedProduct = { ...existingProduct }; // Takes all the properties and add to updatedProduct
                updatedProduct.qty = updatedProduct.qty + 1;//Increment the quantity by one,same product added again
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                // Updated product added to the cart.products
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }
    static deleteProduct(id, productPrice) { // We need to update total cart price as well*
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })

        })

    }
    static getCart(cb) { //cb is used to get a callback when we get the products
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}