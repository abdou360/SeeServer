const express = require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
require('ethernet-ip');
const app=express();

const userRoutes=require('./routes/user');
//_____________________________________
//require('dotenv/config');
//Middlwares
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

//Connect to DB
const url = process.env.DB_CONNECTION;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected successfully !')
}, (err) => { console.log(err); });


//Routes
//var usersRouter = require('./routes/usersRouter');

//var app = express();
//app.use('/users', usersRouter);


app.use(logger('dev'));
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

  app.use('/users',userRoutes);
  module.exports = app;