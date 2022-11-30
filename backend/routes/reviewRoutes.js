const express = require("express");
const router = express.Router();
const reviewServices = require("./reviewServices.js");

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
router.post("/", async (req, res) => {
  let rev_add = req.body;
  const result = await reviewServices.postReview(rev_add);
  if (result) {
    res.status(201).send(result);
  } else {
    res.status(500).end();
  }
});

//update a review (upvotes/downvotes)
router.patch("/:id", async (req, res) => {
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
