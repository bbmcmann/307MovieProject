const mongoose = require("mongoose");
const db = require("../db.js");

const ReviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    review: { type: String, required: true },
    ratingVal: { type: Number, required: true },
    user_id: { type: mongoose.Types.ObjectId, required: true },
    user_name: { type: String, required: true },
    movie_id: { type: Number, required: true },
    date_posted: { type: Date, required: true },
    upvote_list: [
      { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    ],
    downvote_list: [
      { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    ],
  },
  { collection: "reviews" }
);

const Review = db.getDbConnection().model("Reviews", ReviewSchema);
exports.Review = Review;
exports.ReviewSchema = ReviewSchema;
