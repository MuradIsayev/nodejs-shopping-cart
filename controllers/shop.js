const Product = require('../models/product');
const Cart = require("../models/cart");
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/products' })
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    })
  })
};

exports.postCart = (req, res, next) => {
  /*We will retrieve the product id from the incoming request and 
  also fetch that product in our database(in our file) and add it to our cart*/
  const prodId = req.body.productId; // It is a name attribute of our form.
  /* We can access it using req.body. Because it is the part of request body. 
  When we use POST method, it gives us a request which puts all the input data into its body
  Since we passed that value as a hidden input */
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);

  })
  res.redirect('/cart');
  // It will load the get route. As a result we will get cart page.
}
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    // We get that product for this ID, and add a callback with the retrieved product. 
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
