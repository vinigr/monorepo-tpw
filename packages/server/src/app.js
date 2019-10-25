const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('express-async-errors');
require('dotenv').config();

const routes = require('./routes');

const app = express();

mongoose.connect(process.env.URL_BANCO, { useNewUrlParser: true });
app.use(express.json());

app.use((req, res, next) => {
  let oneof = false;
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    oneof = true;
  }
  if (req.headers['access-control-request-method']) {
    res.header(
      'Access-Control-Allow-Methods',
      req.headers['access-control-request-method']
    );
    oneof = true;
  }
  if (req.headers['access-control-request-headers']) {
    res.header(
      'Access-Control-Allow-Headers',
      req.headers['access-control-request-headers']
    );
    oneof = true;
  }
  if (oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }

  // intercept OPTIONS method
  if (oneof && req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(routes);

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(() => {
  this.server.use(async (err, req, res, next) => {
    return res.status(500).json({ error: 'Internal server error' });
  });
});

module.exports = app;
