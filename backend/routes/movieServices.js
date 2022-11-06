const Movie = require("../models/movieSchema.js");
const mongoose = require("mongoose");
axios = require("axios");
dotenv = require("dotenv");
dotenv.config();

async function getMovieById(id) {
  try {
    const apiRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_API}&language=en-US`
    );
    const result = {
      title: apiRes.data.title,
      description: apiRes.data.overview,
      poster_path: apiRes.data.poster_path,
      genres: apiRes.data.genres,
    };
    try {
      const mongoRes = await Movie.findOne({ id: id }); // need to add populate
      return {
        ...mongoRes._doc,
        ...result,
      };
    } catch (error) {
      // movie doesn't exist in mongo database
      return result;
    }
  } catch (error) {
    throw new Error("Could not find movie");
  }
}

function updateMovieById(id) {}

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

function createMovie(id, score, reviewId) {
  let newMovie = new Movie({
    id: id,
    score: score,
    reviews: [mongoose.Types.ObjectId(reviewId)],
  });

  try {
    newMovie.save();
    return newMovie;
  } catch (error) {
    throw new Error("Something went wrong with creating a Movie");
  }
}

module.exports = {
  getMovieById,
  updateMovieById,
  searchMovie,
  createMovie,
};
