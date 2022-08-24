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

// bring in JSON data
let data = require('./data/weather.json')

// USE
// Once we have required something, we have to use it. This were will will asign the required file a variable. React does this in one step, express takes 2: require and use. This is just Express is.

// once we have express we are must USE express
const app = express();

app.use(cors());

// define PORT value - validate that .env is working
const PORT = process.env.PORT || 3002;
// if the server is running on 3002, then I know something is wrong in either my .env or how I'm importing the values from it

// ROUTES
// We will use these to access our endpoints

// create a basic default route:
// app.get correletes to axios.get
// the first parameter is a URL in quotes


app.get('/weather', (request, response, next) => {
  console.log(request.query.city_name);
  try {
    let cityInput = request.query.city_name;
    let cityObj = data.find(city => city.city_name === cityInput)
    let selected = cityObj.data.map(r=> new Forecast(r));
    response.send(selected);
    console.log(selected);
  } catch(err) {
    next(err)
  }
})

app.get('/sayHello', (request, response) => {
  console.log(request.query.name);
  let name = request.query.name;
  let lastName = request.query.lastName;
  response.send(`Hello ${name} ${lastName}`);
});

// catch all "star" route
app.get('*', (request, response) => {
  response.send('Route does not exists. These are not the droids you\'re looking for.');
});

// ERRORS
// handle any errors

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
}) 

// CLASSES

class Forecast {
  constructor(city) {
    this.date = city.datetime;
    this.desc = city.weather.description;
    }
}

// LISTEN
// Start the server
// Listen is express method. It takes in a Port value and callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));