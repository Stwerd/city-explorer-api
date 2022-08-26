const axios = require('axios');

async function getMovie(request, response, next){
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
    // next(err);
    Promise.resolve().then(()=>{
      throw new Error(err.message);
    }).catch(next);
  }
}

// CLASSES
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

module.exports = getMovie;