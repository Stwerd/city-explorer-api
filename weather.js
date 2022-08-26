
const axios = require('axios');

async function getWeather(request, response, next) {
  console.log(request.query.city_name);
  try {

    let params = {
      key: process.env.REACT_APP_WEATHER,
      lat: request.query.lat,
      lon: request.query.lon
    }
    const url = 'https://api.weatherbit.io/v2.0/current';
    const getIt = await axios.get(url, { params });
    let selected = new Forecast(getIt);
    response.send(selected);
    console.log(selected);
    // response.send(getIt.data);
  } catch (err) {
    // next(err);
    Promise.resolve().then(() => {
      throw new Error(err.message);
    }).catch(next);
  }
}

class Forecast {
  constructor(city) {
    this.date = city.data.data[0].datetime;
    this.desc = city.data.data[0].weather.description;
    this.temp = city.data.data[0].temp;
  }
}

module.exports = getWeather;