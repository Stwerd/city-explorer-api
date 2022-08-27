
const axios = require('axios');

let cache = {};

async function getWeather(request, response, next) {
  try {
    let key = `${request.query.lat}${request.query.long}data`//req.query lat+lon

    let time = Date.now();
    let timeDifference = 1000 * 10;
    
    // if queryname is in cache, grab it and send it
    if(cache[key] && time - cache[key].timeStamp < timeDifference) {
      response.send(cache[key].data);
      console.log('its in the cache');
    }
    else {
      let params = {
        key: process.env.REACT_APP_WEATHER,
        lat: request.query.lat,
        lon: request.query.lon
      }

      const url = 'https://api.weatherbit.io/v2.0/current';
      const getIt = await axios.get(url, { params });
      let selected = new Forecast(getIt);
      response.send(selected);
      cache[key]={
        data: selected,
        timeStamp: time
      };
      console.log('Not found in the cache. Lets grab it!');
    }
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