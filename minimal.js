// Require Express
const express = require('express');



// Define a port
const port = 1337;



// Create a new Express instance
const app = new express();



// Serve static assets in the 'public' folder
app.use(express.static('public'));



// Start listening!
app.listen(port, () => {
  console.log('Hello from port ', port);
});
