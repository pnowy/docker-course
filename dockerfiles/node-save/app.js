'use strict';

const express = require('express');
const fs = require('fs');

const PORT = 3000;
const HOST = '0.0.0.0';

const appmessages = process.env.APP_MESSAGES || './messages.txt'
console.log(`APPDATA directory: ${appmessages}`)

const app = express();

app.get('/', (req, res) => {
  if (fs.existsSync(appmessages)) {
    const content = fs.readFileSync(appmessages, 'utf8');
    res.send(content);
  } else {
    res.send('No messages stored yet!');
  }
});

app.post('/:message', function (req, res) {
  console.log(`Appending data to file with message=${req.params.message}`)
  fs.appendFileSync(appmessages, req.params.message + '\n');
  res.send(`POST request to the homepage ${req.params.message}`)
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);