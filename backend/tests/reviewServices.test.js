const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
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
    title: "Amazing movie123",
    review: "Full of action, humor, and family fun",
    ratingVal: 8,
    user_id: "6362bb7d8b68ea4a3f5daf3a",
    movie_id: 24428,
    user_name: "testuser123",
    date_posted: new Date(),
    upvote_list: ["6362bb7d8b68ea4a3f5daf3a"],
    downvote_list: [],
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
      title: "Loved it456",
      review: "Full of action, humor, and family fun",
      ratingVal: 8,
      user_id: "6362bb7d8b68ea4a3f5daf3a",
      user_name: "testuser123",
      movie_id: 24428,
      date_posted: new Date(),
      upvote_list: ["6362bb7d8b68ea4a3f5daf3a"],
      downvote_list: [],
    };
    const result = await postReview(dummyReview);
    expect(result.title).toBe("Loved it456");
    expect(result.ratingVal).toBe(8);
    expect(result.movie_id).toBe(24428);
    await Review.findByIdAndDelete(result._id);
  });

  test("invalid", async () => {
    // invalid due to missing fields
    dummyReview = {
      user_id: "6362bb7d8b68ea4a3f5daf3a",
      movie_id: 24428,
      date_posted: new Date(),
      upvote_list: ["6362bb7d8b68ea4a3f5daf3a"],
      downvote_list: [],
    };
    const result = await postReview(dummyReview);
    expect(result).not.toBeDefined();
  });

  describe("updateVotes", () => {
    test("success - upvote", async () => {
      const result = await updateVotes(id, ["6362bb7d8b68ea4a3f5daf3a"], []);
      expect(result.upvote_list).toStrictEqual([
        ObjectId("6362bb7d8b68ea4a3f5daf3a"),
      ]);
      expect(result.downvote_list).toStrictEqual([]);
    });

    test("success - downvote", async () => {
      const result = await updateVotes(id, [], ["6362bb7d8b68ea4a3f5daf3a"]);
      expect(result.upvote_list).toStrictEqual([]);
      expect(result.downvote_list).toStrictEqual([
        ObjectId("6362bb7d8b68ea4a3f5daf3a"),
      ]);
    });

    test("invalid id", async () => {
      const result = await updateVotes("notanId", 0, 0);
      expect(result).not.toBeDefined();
    });
  });
});
