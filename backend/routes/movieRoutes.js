const express = require("express");
const router = express.Router();
const Movie = require("../models/movieSchema.js");

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
