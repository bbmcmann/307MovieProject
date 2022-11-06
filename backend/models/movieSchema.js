const mongoose = require("mongoose");
const db = require("../db.js");

const movieSchema = new mongoose.Schema(
  {
    // The rest of the fields are given by the external movie api
    id: { type: Number, required: true },
    score: { type: Number, required: true },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Reviews" }],
  },
  { collection: "movies" }
);

const Movie = db.getDbConnection().model("Movies", movieSchema);
module.exports = Movie;
