'use strict';

const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

const responseJson = {
    "message": "Kurs Dockera!"
}

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.json(responseJson);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);