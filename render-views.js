const express = require('express');
const {PORT} = require('./config');
const app = new express();
app.use(express.static('public'));
const router = new express.Router();
const users = require('./users');
const path = require('path');





// Tell express to use EJS as a rendering engine
app.set('view engine', 'ejs');



// Tell express where these views are located
app.set('views', path.join(__dirname, '/views'));



// Declare a function to handle fetching and rendering users
const renderUser = (req, res) => {
  let id = Number(req.params.id);
  // Either find the right user or set the user to false
  let user = users.filter((user) => user.id === id)[0] || false;
  // Render the 'user.ejs' template in /views/ with the user data or false
  res.render('user', {user});
};



// Get an render a user using the renderUser function
router.get('/user-profiles/:id', renderUser);





app.use(router);
app.listen(PORT, () => {
  console.log('Hello from port ', PORT);
});
