const mongoose = require("mongoose");
const db = require("../db.js");

const movieSchema = new mongoose.Schema({
  score: { type: Number, required: true },
});

const Movie = db.getDbConnection().model("Movies", movieSchema);
module.exports = Movie;
