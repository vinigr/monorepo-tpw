const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();


mongoose.connect(
  'mongodb+srv://primeiro:senhaPadrao@cluster0-67ojl.gcp.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
app.use(express.json());
app.use(routes);

module.exports = app;
