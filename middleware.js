const express = require('express');
const {PORT} = require('./config');
const app = new express();
app.use(express.static('public'));
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');





// Create a log file
let flags = 'w';
let logStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags});



// Promisify the write method
logStream.writeAsync = Promise.promisify(logStream.write);



// Define caching middleware
const setCacheHeaders = (req, res, next) => {
  res.set({
    'Cache-Control': 'no-cache'
  });
  next();
};



// Define logging middleware
const logIpAddress = (req, res, next) => {
  let data = req.ip + ' [' + new Date().toLocaleString() + ']';
  data += ' \"' + req.method + ' ' + req.path + '\"' + '\n';
  logStream.writeAsync(data)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log('Error writing log data ', err);
      res.sendStatus(500);
    });
};



// Send some arbitrary data back
const sendDataFile = (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'trebuchet.jpg'));
};



// Hook up middleware
app.get('/middleware', setCacheHeaders, logIpAddress, sendDataFile);


app.listen(PORT, () => {
  console.log('Hello from port ', PORT);
});
