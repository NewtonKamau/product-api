const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const axios = require('axios')

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
 
});

app.post('/api/addProduct', upload.array(), (req, res) => {
  //add products to db
  
   
});
app.post('/api/deleteProduct', upload.array(), (req, res) => {
 //delete a particular product using the id
});

app.post('/api/editproduct', upload.array(), (req, res) => {
  //use product id to edit

});
app.post('/api/addCategory', upload.array(), (req, res) => {

});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`The app is running on port: ${port}`);
});
