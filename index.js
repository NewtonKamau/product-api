const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');


// create the mysql connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'product_api'
});

//test the connection
connection.connect(function (err) {
  if (err) {
    console.error('error connecting to database: ' + err.stack);
    return;
  }

  console.log('Database connected! ' + connection.threadId);
});

const upload = multer(); // parse multi-part/form-data
const app = express();
const regions = [];
const data = [];
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,POST');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // parsing application/x-www-form-urlencodedapp.
app.get('/api/getproducts', (req, res) => {
  //Fetch all products from dB 
  connection.query('SELECT * FROM product', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.status(200).json(results);
  });
  connection.end();
 
});

app.post('/api/addProduct', upload.array(), (req, res) => {
  const product = {
    "product_name": req.body.name,
    "product_category": req.body.category
  }
  //add products to db
  connection.query('INSERT INTO product  SET ? ', product, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
   res.status(200).json(results);
  });
  connection.end();
  
   
});
app.post('/api/deleteProduct', upload.array(), (req, res) => {
 //delete a particular product using the id

});

app.post('/api/editproduct', upload.array(), (req, res) => {
  //use product id to edit

});
app.post('/api/addCategory', upload.array(), (req, res) => {
 const category = {
   "category_name": req.body.category
 }
 //add products to db
 connection.query('INSERT INTO category  SET ? ', category, function (error, results, fields) {
   if (error) throw error;
   console.log('The solution is: ', results);
   res.status(200).json(results);
 });
 connection.end();
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`The app is running on port: ${port}`);
});
