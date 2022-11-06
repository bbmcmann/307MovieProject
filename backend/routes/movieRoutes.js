const express = require("express");
const router = express.Router();
const Movie = require("../models/movieSchema.js");
const {
  getMovieById,
  updateMovieById,
  searchMovie,
  createMovie,
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
// Params: movie api id, review object
router.post("/", async (req, res) => {
  const { id, review } = req.body;

  try {
    const result = createMovie(id, review.score, review.id);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
