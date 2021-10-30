const express = require('express');

const app = express();
const router = require('./routes/router');

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('OHM DELIVERY APIs');
});

app.use(router);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.log('Error Handling Middleware called');
  console.log('Path: ', req.path);

  res.send(500, 'Error hadling ', req.path);
});

module.exports = app;
