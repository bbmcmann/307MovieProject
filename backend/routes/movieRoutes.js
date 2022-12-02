const express = require("express");
const { authenticateUser } = require("./authServices.js");
const router = express.Router();
const {
  getMovieById,
  searchMovie,
  createMovie,
  getPopularMovies,
  getSuggestedMovies,
} = require("./movieServices.js");

// search for movies with a similar name from the query string
router.get("/search", async (req, res) => {
  const queryString = req.query.query;
  try {
    const result = await searchMovie(queryString);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

// get the current popular movies. limit to ten movies
router.get("/popular", async (req, res) => {
  try {
    const result = await getPopularMovies();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/suggested", async (req, res) => {
  const userId = req.query.user;
  try {
    const result = await getSuggestedMovies(userId);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get a movie by id
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await getMovieById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).end();
  }
});

// Create a new movie to DB
// Params: movie api id (integer), review object
router.post("/", authenticateUser, async (req, res) => {
  const { id, review } = req.body;
  try {
    const result = await createMovie(id, review.id, review.score);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
