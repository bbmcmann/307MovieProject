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
    const newScore =
      (movie.score * movie.reviews.length + reviewScore) /
      (movie.reviews.length + 1);
    const result = await Movie.updateOne(
      { _id: id },
      {
        $set: { score: newScore.toFixed(2) },
        $push: { reviews: reviewId },
      }
    );
    return result;
  } catch (error) {
    throw new Error("Could not update movie");
  }
}

// create a new movie document in mongoDB
function createMovie(id, reviewId, score) {
  try {
    let newMovie = new Movie({
      _id: id,
      score: score,
      reviews: [mongoose.Types.ObjectId(reviewId)],
    });
    newMovie.save();
    return newMovie;
  } catch (error) {
    throw new Error("Something went wrong with creating a Movie");
  }
}

async function movieInDb(id) {
  try {
    const result = await Movie.findById(id);
    return result;
  } catch (error) {
    return null;
  }
}

module.exports = {
  getMovieById,
  updateMovieById,
  searchMovie,
  createMovie,
  movieInDb,
};
