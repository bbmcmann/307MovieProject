const Movie = require("../models/movieSchema.js");
const mongoose = require("mongoose");
axios = require("axios");
dotenv = require("dotenv");
dotenv.config();

// Given a query string, return the options of movies with similar names
async function searchMovie(query) {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API}&query=${query}&include_adult=false`
    );
    return result.data.results;
  } catch (error) {
    throw new Error("Something went wrong with search");
  }
}

// Given an integer id, retrieve the data from the external api and from mongo if exists
async function getMovieById(id) {
  try {
    const apiRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_API}&language=en-US`
    );
    // extract only necessary info
    const result = {
      title: apiRes.data.title,
      description: apiRes.data.overview,
      poster_path: apiRes.data.poster_path,
      genres: apiRes.data.genres,
    };
    const mongoRes = await movieInDb(id);
    if (!mongoRes) return { _id: apiRes.data.id, ...result };
    else {
      return {
        ...mongoRes._doc,
        ...result,
      };
    }
  } catch (error) {
    throw new Error("Could not find movie");
  }
}

// update movie doc in mongo. Assumes movie exists in db
async function updateMovieById(id, reviewId, reviewScore) {
  try {
    const movie = await Movie.findById(id);
    // console.log(`MOVIEID: ${id}`);
    // console.log(movie);
    // console.log(movie.reviews.length);
    // console.log(reviewScore);
    // console.log(typeof movie.score);
    // console.log(typeof reviewScore);
    // console.log(typeof movie.reviews.length);

    // console.log("top");
    // console.log(movie.score * movie.reviews.length + reviewScore);
    // console.log("bottom");
    // console.log(movie.reviews.length + 1);
    try {
      const newScore =
        (movie.score * Number(movie.reviews.length) + reviewScore) /
        (Number(movie.reviews.length) + 1);
      console.log(newScore.toFixed(2));
      const result = await Movie.updateOne(
        { _id: id },
        {
          $set: { score: newScore.toFixed(2) },
          $push: { reviews: reviewId },
        }
      );
      return result;
    } catch (error) {
      throw new Error("could not update movie");
    }
  } catch (error) {
    throw new Error("Could not find movie");
  }
}

// create a new movie document in mongoDB
async function createMovie(id, reviewId, score) {
  try {
    let newMovie = new Movie({
      _id: id,
      score: score,
      reviews: [mongoose.Types.ObjectId(reviewId)],
    });
    await newMovie.save();
    return newMovie;
  } catch (error) {
    throw new Error("Something went wrong with creating a Movie");
  }
}

async function movieInDb(id) {
  try {
    const result = await Movie.findById(id).populate("reviews");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getPopularMovies() {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.MOVIE_API}&language=en-US&page=1&region=US`
    );
    return result.data.results.slice(0, 10);
  } catch (error) {
    throw new Error("Something went wrong with popular movies");
  }
}

async function getSuggestedMovies(userId) {
  //! Wait on user schema to implement
  try {
    if (userId) {
      const movieId = 0;
      // get a top movie from the user's reviews and get recommendations for that
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.MOVIE_API}&language=en-US&page=1`;
    } else {
      // if no userId, just send popular movies instead
      return getPopularMovies();
    }
  } catch (error) {
    throw new Error("Something went wrong with suggested movies");
  }
}

module.exports = {
  getMovieById,
  updateMovieById,
  searchMovie,
  createMovie,
  getPopularMovies,
  getSuggestedMovies,
  movieInDb,
};
