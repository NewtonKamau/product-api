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

  console.log('Database connected! connectionId ' + connection.threadId);
});

const upload = multer(); // parse multi-part/form-data
const app = express();
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,POST');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // parsing application/x-www-form-urlencodedapp.

//Fetch all products from dB
app.get('/api/getProducts', (req, res) => { 
  connection.query('SELECT * FROM product', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.status(200).json(results);
  });
  connection.end();
 
});

//Add product to db
app.post('/api/addProduct', upload.array(), (req, res) => {
   const response = {
     "message": "product created"
   }
  const product = {
    "product_name": req.body.name,
    "product_category": req.body.category
  }

  connection.query('INSERT INTO product  SET ? ', product, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
   res.status(200).json(response);
  });
  connection.end();
  
   
});
app.post('/api/deleteProduct', upload.array(), (req, res) => {
 //delete a particular product using the id
 const product = {
   
   "product_id": req.body.id
 }
 const response = {
   "message": "product deleted"
 }

 //delete products from db
 connection.query(`DELETE FROM product WHERE product_id = ${product.product_id} `, function (error, results, fields) {
   if (error) throw error;
   res.status(200).json(response);
 });
 connection.end();

});

//edit/update product
app.post('/api/editProduct', upload.array(), (req, res) => {
  const product = {
    "product_id": req.body.id,
    "product_name": req.body.name,
    "product_category": req.body.category
  }

  connection.query(`UPDATE product SET product_name = ?, product_category = ? WHERE product_id = ?`, [product.product_name, product.product_category, product.product_id], function (error, results, fields) {
    if (error) throw error;
     const response = {
       "message": "product updated"
     }
     console.log(results);
     
   res.status(200).json(response);
  });



});

//create a category
app.post('/api/addCategory', upload.array(), (req, res) => {
  const response = {
    "message": "category created"
  }
  
 const category = {
   "category_name": req.body.name
 }
 //add category to db
 connection.query('INSERT INTO category  SET ? ', category, function (error, results, fields) {
   if (error) throw error;
  
   res.status(200).json(response);
 });
 connection.end();
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`The app is running on port: ${port}`);
});
