// required dependencies
const path = require('path');
const express = require('express');
const bp = require('body-parser');

// import database connection
const dbConnect = require('./config/db.config');

// import controllers
const getCategories = require('./controllers/getCategories.controller');
const getPhrases = require('./controllers/getPhrases.controller');

// create express app
const app = express();

// dotenv package
require('dotenv').config();

// port number
const PORT = process.env.PORT || 3005;

// environment
const NODE_ENV = process.env.NODE_ENV;

// middleware
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist/client')));
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// render client app
app.get(['/'], (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/dist/client', 'index.html'));
});

// endpoints
app.get('/api/get-categories', getCategories);
app.post('/api/get-phrases', getPhrases);

// execute database connection
dbConnect();

// run server
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}\nenv: ${NODE_ENV}`);
});
