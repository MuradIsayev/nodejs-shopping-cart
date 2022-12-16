const path = require('path');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes); // Only routes start with /admin will go into the adminRoutes file.
app.use(shopRoutes);

app.use('/', errorController.get404);
app.listen(3000);