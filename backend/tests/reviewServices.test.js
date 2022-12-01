const mongoose = require("mongoose");
const ReviewSchema = require("../models/reviewSchema.js");
const {
  getReviews,
  postReview,
  updateVotes,
} = require("../routes/reviewServices.js");

const Review = ReviewSchema.Review;
let id;

beforeAll(async () => {
  let dummyReview = {
    review_title: "Amazing movie123",
    text: "Full of action, humor, and family fun",
    score: 8,
    author_id: "6362bb7d8b68ea4a3f5daf3a",
    movie_id: 24428,
    date_posted: new Date(),
    upvotes: 100,
    downvotes: 1,
  };
  let revOne = new Review(dummyReview);
  await revOne.save();
  id = revOne._id;
});

afterAll(async () => {
  await Review.findByIdAndDelete(id);
  await mongoose.disconnect();
});

describe("getReviews", () => {
  test("success - results exists", async () => {
    const result = await getReviews(24428);
    expect(result).toBeTruthy();
    expect(result[0].movie_id).toBe(24428);
  });

  test("success - results do not exist", async () => {
    const result = await getReviews(299536);
    expect(result.length).toBe(0);
  });

  test("invalid id", async () => {
    const result = await getReviews("notanid");
    expect(result).not.toBeDefined();
  });
});

describe("postReview", () => {
  test("success", async () => {
    dummyReview = {
      review_title: "Loved it456",
      text: "Full of action, humor, and family fun",
      score: 8,
      author_id: "6362bb7d8b68ea4a3f5daf3a",
      movie_id: 24428,
      date_posted: new Date(),
      upvotes: 100,
      downvotes: 1,
    };
    const result = await postReview(dummyReview);
    expect(result.review_title).toBe("Loved it456");
    expect(result.score).toBe(8);
    expect(result.movie_id).toBe(24428);
    await Review.findByIdAndDelete(result._id);
  });

  test("invalid", async () => {
    // invalid due to missing fields
    dummyReview = {
      author_id: "6362bb7d8b68ea4a3f5daf3a",
      movie_id: 24428,
      date_posted: new Date(),
      upvotes: 100,
      downvotes: 1,
    };
    const result = await postReview(dummyReview);
    expect(result).not.toBeDefined();
  });

  describe("updateVotes", () => {
    test("success - upvote", async () => {
      const result = await updateVotes(id, 101, 1);
      expect(result.upvotes).toBe(101);
      expect(result.downvotes).toBe(1);
    });

    test("success - downvote", async () => {
      const result = await updateVotes(id, 100, 2);
      expect(result.upvotes).toBe(100);
      expect(result.downvotes).toBe(2);
    });

    test("invalid id", async () => {
      const result = await updateVotes("notanId", 0, 0);
      expect(result).not.toBeDefined();
    });
  });
});
