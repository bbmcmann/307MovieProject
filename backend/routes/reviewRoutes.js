const express = require("express");
const { authenticateUser } = require("./authServices.js");
const router = express.Router();
const reviewServices = require("./reviewServices.js");
const movieServices = require("./movieServices.js");

// //get all reviews
// router.get("/", async (req, res) => {

// })

//get reviews by Movie ID
router.get("/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const result = await reviewServices.getReviews(id);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(505).send("An error occurred in the server");
  }
});

//post a review
router.post("/", authenticateUser, async (req, res) => {
  let rev_add = req.body;
  console.log("adding");
  console.log("rev_add");
  console.log(rev_add);
  const result = await reviewServices.postReview(rev_add);
  if (result) {
    const movie_exists = await movieServices.movieInDb(rev_add.movie_id);
    if (!movie_exists) {
      console.log("MAKING MOVIE");
      try {
        const new_movie = await movieServices.createMovie(
          rev_add.movie_id,
          result._id,
          Number(result.ratingVal)
        );
        console.log(new_movie);
      } catch (error) {
        res.status(500).end();
      }
    } else {
      console.log(result);
      const result2 = await movieServices.updateMovieById(
        rev_add.movie_id,
        result._id,
        Number(rev_add.ratingVal)
      );
      if (result2) {
        res.status(201).send(result2);
      } else {
        res.status(500).end();
      }
    }
  } else {
    res.status(500).end();
  }
});

//update a review (upvotes/downvotes)
router.patch("/:id", authenticateUser, async (req, res) => {
  const id = req.params["id"];
  const upvote_list = req.body.upvote_list;
  const downvote_list = req.body.downvote_list;
  try {
    const result = await reviewServices.updateVotes(
      id,
      upvote_list,
      downvote_list
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(505).send("An error occurred on the system");
  }
});
module.exports = router;
