'use strict';

console.log('our first server');
// REQUIRE
// in our servers, we have to use 'require' instead of import. Here we will list the requirements for a server

// to create a server we are bringing in express
const express = require('express');

// we need to bring in our .env file, so we'll use this after we run 'npm i dotenv':
require('dotenv').config();

// we must include cors if we want to share resources over the web. 
const cors = require('cors');


const getWeather = require('./myweather.js');

const getMovie = require('./mymovie.js');

// once we have express we are must USE express
const app = express();

app.use(cors());

// define PORT value - validate that .env is working
const PORT = process.env.PORT || 3002;
// if the server is running on 3002, then I know something is wrong in either my .env or how I'm importing the values from it

// ROUTES
// We will use these to access our endpoints

app.get('/weather', getWeather);

app.get('/movie', getMovie);


// catch all "star" route
app.get('*', (request, response) => {
  response.send(' 4040 Not Found. These are not the droids you\'re looking for.');
});


// ERRORS
// handle any errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
})


// LISTEN
// Start the server
// Listen is express method. It takes in a Port value and callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));