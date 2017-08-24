const express = require('express');
const {PORT} = require('./config');
const app = new express();
app.use(express.static('public', {extensions: ['html']}));
const router = new express.Router();
const fs = require('fs');





// Grab the body parser module
const bodyParser = require('body-parser');



// Extended allows for more complex, json-like urlencoded data
let extended = true;



// Tell express to parse urlencoded and json data with bodyParser
app.use(bodyParser.urlencoded({extended}));
app.use(bodyParser.json({extended}));



// Setup a post route for creating users
router.post('/submit', (req, res) => {
  let body = req.body;
  // Save to disk
  fs.writeFile('newUser.json', JSON.stringify(body, null, 2), () => {
    // Just send the body back
    res.json(body);
  });
});






app.use(router);
app.listen(PORT, () => {
  console.log('Hello from port ', PORT);
});
