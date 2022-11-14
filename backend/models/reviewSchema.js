const mongoose = require("mongoose");
const db = require("../db.js");

const ReviewSchema = new mongoose.Schema(
  {
    review_title: { type: String, required: true },
    text: { type: String, required: true },
    author_id: { type: mongoose.Types.ObjectId, required: true },
    movie_id: { type: Number, required: true },
    date_posted: { type: Date, required: true },
    upvotes: { type: Number, required: true },
    downvotes: { type: Number, required: true },
  },
  { collection: "reviews" }
);

const Review = db.getDbConnection().model("Reviews", ReviewSchema);
exports.Review = Review;
exports.ReviewSchema = ReviewSchema;