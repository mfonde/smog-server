require('dotenv').config();

//! Base essentials for a working server:
var express = require('express'); //? brings in the requirement of the express npm package
var app = express(); //! Creates an instance of express.

//! Database to postgresql connection :
var sequelize = require('./db');

//! Body parser for JSON responses in Postman :
const bodyParser = require('body-parser');

//! Syncs sql database to ran server:
sequelize.sync(); //TODO: When resetting all tables, put {force: true} into the parameters of sync().
app.use(bodyParser.json());

app.use(require('./middleware/headers')); //Needs to be above routes

//! Controllers :
var test = require('./controllers/testcontroller');
const user = require('./controllers/usercontroller');
const review = require('./controllers/reviewcontroller');
const favorite = require('./controllers/favoritecontroller');
const movie = require('./controllers/moviecontroller');

//! Routes :
app.use('/user', user);
app.use('/review', review);
app.use('/favorite', favorite);
app.use('/movie', movie);

//? Message displayed to console when backend server is up and running connected to the correct port
app.listen(process.env.PORT, function () {
    //! if app is being hosted on this port, print the line to the console
    console.log('The backend is now listening on port 3000');
});

//! Test Route
app.use('/test', test);
//?       ENDPOINT   (request, response)
app.use('/api/test', function (req, res) {
    //? Response Call Back Function sends this string of text into the response of the postman JSON
    res.send('This is a test from the /api/test endpoint. Backend connected');
});
