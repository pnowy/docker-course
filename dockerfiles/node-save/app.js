'use strict';

const express = require('express');
const fs = require('fs');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

const appdata = process.env.APPDATA || './messages.txt'
console.log(`APPDATA directory: ${appdata}`)

const app = express();

app.get('/', (req, res) => {
  var content = fs.readFileSync(appdata, 'utf8');
  res.send(content)
});

app.post('/:message', function (req, res) {
  fs.appendFileSync(appdata, req.params.message + '\n');
  res.send(`POST request to the homepage ${req.params.message}`)
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);