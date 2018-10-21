'use strict';

const PORT = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')
const Service = require('./services/app/Service')
const app = express();

// GENERAL MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

// ROUTES
app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, './dist', 'index.html'))
});
app.get('/api', function(req, res, next){
  Service((response)=> {
    res.contentType("application/json")
    res.send(response)
    res.end()
  })
})
app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});
