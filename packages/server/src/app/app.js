const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();


mongoose.connect(
  'mongodb+srv://primeiro:senhaPadrao@cluster0-67ojl.gcp.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
app.use(express.json());

app.use(function(req, res, next) {
  var oneof = false;
  if(req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      oneof = true;
  }
  if(req.headers['access-control-request-method']) {
      res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
      oneof = true;
  }
  if(req.headers['access-control-request-headers']) {
      res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
      oneof = true;
  }
  if(oneof) {
      res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }

  // intercept OPTIONS method
  if (oneof && req.method == 'OPTIONS') {
      res.send(200);
  }
  else {
      next();
  }
});

app.use(routes);

module.exports = app;
