const ReviewSchema = require("../models/reviewSchema");

const Review = ReviewSchema.Review;

//finds all reviews with movie id
async function getReviews(id) {
  try {
    return await Review.find({ movie_id: id });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

//adds a new review to database
async function postReview(rev) {
  try {
    const rev_add = new Review(rev);
    const saved_rev = await rev_add.save();
    return saved_rev;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

//updates vote counts
async function updateVotes(id, upvote_list, downvote_list) {
  try {
    const result = await Review.updateOne(
      { _id: id },
      { $set: { upvote_list: upvote_list, downvote_list: downvote_list } }
    );
    if (result.acknowledged) {
      return await Review.findById(id);
    }
    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

exports.getReviews = getReviews;
exports.postReview = postReview;
exports.updateVotes = updateVotes;
