const Movie = require("../models/movieSchema.js");
const mongoose = require("mongoose");
axios = require("axios");
dotenv = require("dotenv");
dotenv.config();

function getMovieById(id) {
  console.log(id);
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
    _id: mongoose.Types.ObjectId(id),
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
