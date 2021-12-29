const express = require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
require('ethernet-ip');
const app=express();

const userRoutes=require('./routes/user');
//Cors headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
//Mongodb connection
mongoose.connect('mongodb+srv://isee:1234@cluster0.fb7yd.mongodb.net/isee?authSource=admin&replicaSet=atlas-10ra2g-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion echouée !'));
  app.use(bodyParser.json());

  app.use('/users',userRoutes);
  module.exports = app;