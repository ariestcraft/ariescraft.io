const express = require('express')
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
//const fileupload = require("express-fileupload");


const app = express();




const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//connection to MySQL
const connection = require('./database/db');

//connection to show
const adminRouters = require('./edits/adminRouters');
app.use("/", adminRouters);

const customerRouters = require('./edits/customerRouters');
app.use("/", customerRouters);

const productionRouters = require('./edits/productionRouters');
app.use("/", productionRouters);



// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/css', express.static(__dirname + 'public/backend/css'))

app.use('/css', express.static(__dirname + 'public/production/css'))
app.use('/js', express.static(__dirname + 'public/production/js'))
app.use('/css', express.static(__dirname + 'public/production/backend/css'))

app.use('/css', express.static(__dirname + 'public/customer/css'))
app.use('/js', express.static(__dirname + 'public/customer/js'))
app.use('/css', express.static(__dirname + 'public/customer/backend/css'))




//set views file
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')





//  Listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`))