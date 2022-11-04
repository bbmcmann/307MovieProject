const express = require("express");
const router = express.Router();
const Movie = require("../models/movieSchema.js");
const {
  getMovieById,
  updateMovieById,
  searchMovie,
} = require("./movieServices.js");

// search for movies with a similar name from the query string
router.get("/search", async (req, res) => {
  const queryString = req.query.query;
  try {
    const result = await searchMovie(queryString);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get/put a movie by id
router
  .route("/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    try {
      const result = getMovieById(id);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .put(async (req, res) => {
    const id = req.params.id;
    try {
      const result = updateMovieById(id);
      res.status(200).end();
    } catch (error) {
      res.status(400).send(error);
    }
  });

// Create a new movie to DB
// Params: score (Integer)
router.post("/", async (req, res) => {
  const { score } = req.body;

  let newMovie = new Movie({
    score: score,
  });

  try {
    newMovie.save();
    res.status(201).send(newMovie);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
