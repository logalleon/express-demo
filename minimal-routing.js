const express = require('express');
const {PORT} = require('./config');
const app = new express();
app.use(express.static('public'));





// Declare a new router
const router = new express.Router();



// Mock data
const users = require('./users');



/**
 * Setup a 'GET' handler for the router
 * The router expects a path, with some matching critera
 * and [callback, ...] functions
 * Callbacks before the final callback are typically called middleware
 * This function returns all users
 */
router.get('/api/users', (req, res) => {
  res.set({
      'Content-Type': 'application/json'
    })
    .send(JSON.stringify(users))
    .end();
});



// And this returns a single user by id
router.get('/api/users/:id', (req, res) => {
  let id = Number(req.params.id);
  let user = users.filter((user) => user.id === id)[0];
  // res.json does the same as above in a lot less words
  res.json(user);
});



// Make sure to actually user the router
app.use(router);





app.listen(PORT, () => {
  console.log('Hello from port ', PORT);
});
