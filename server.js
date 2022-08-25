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

//include axios to make requests
const axios = require('axios');

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


app.get('/weather', async (request, response, next) => {
  console.log(request.query.city_name);
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    const url = `https://api.weatherbit.io/v2.0/current?key=${process.env.REACT_APP_WEATHER}&lat=${lat}&lon=${lon}`;
    const getIt = await axios.get(url);
    let selected = new Forecast(getIt);
    response.send(selected);
    console.log(selected);
    // response.send(getIt.data);
  } catch (err) {
    next(err);
  }
})

app.get('/movie', async(request, response, next) => {
  console.log(request.query.title);
  try{
    let title = request.query.title;
    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIES}&language=en-US&query=${title}&page=1&include_adult=false`
    let getIt = await axios.get(url);
    //send it thru the object maker then send it up!!

    // response.send(getIt.data);
    let movArr = getIt.data.results.map(r=> new Movie(r));
    response.send(movArr);
  }
  catch (err){
    next(err);
  }
})

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
    this.date = city.data.data[0].datetime;
    this.desc = city.data.data[0].weather.description;
    this.temp = city.data.data[0].temp;
  }
}

class Movie {
  constructor(mov){
    this.title = mov.original_title;
    this.desc = mov.overview;
    this.url = `https://image.tmdb.org/t/p/w500${mov.poster_path}`;
    this.average_votes = mov.vote_average;
    this.total_votes = mov.vote_count;
    this.popularity = mov.popularity;
    this.release_date = mov.release_date;
  }
}
// LISTEN
// Start the server
// Listen is express method. It takes in a Port value and callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));