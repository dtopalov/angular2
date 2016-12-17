const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./server/config/database'); // get db config file
const User = require('./server/data/models/User'); // get the mongoose model
const port = process.env.PORT || 3000;
const jwt = require('jwt-simple');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// log to console
app.use(morgan('dev'));
 
// Use the passport package in our application
app.use(passport.initialize());
 
// demo Route (GET http://localhost:3000)
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// connect to database
mongoose.connect(config.database);
let UserModel = require('./server/data/models/User');
UserModel.init();
 
// pass passport for configuration
require('./server/config/passport')(passport);
 
// bundle our routes
var apiRoutes = express.Router();

let usersController = require('./server/controllers/UsersController');
// create a new user account (POST http://localhost:8080/api/signup)
apiRoutes.post('/signup', usersController.postRegister);
apiRoutes.post('/authenticate', usersController.postAuthenticate);
 
// connect the api routes under /api/*
app.use('/api', apiRoutes);
 
// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);