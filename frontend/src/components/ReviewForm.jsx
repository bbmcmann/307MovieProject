import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import styled from "styled-components";
import { Cookies } from "react-cookie";

// function setValue=
const StyledForm = styled(Paper)`
  text-align: left;
  padding-top: 25px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function ReviewForm(props) {
  const cookies = new Cookies();
  const [rating, setRating] = useState({
    title: "",
    review: "",
    ratingVal: 1,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "review-rating")
      setRating({
        title: rating["title"],
        review: rating["review"],
        ratingVal: value,
      });
    else if (name === "review-title")
      setRating({
        title: value,
        review: rating["review"],
        ratingVal: rating["ratingVal"],
      });
    else
      setRating({
        title: rating["title"],
        review: value,
        ratingVal: rating["ratingVal"],
      });
  }

  async function handleSubmit(rating) {
    const auth_id = cookies.get("userId");
    const poster_name = cookies.get("username");
    const thisTitle = rating.title;
    const thisReview = rating.review;
    const thisScore = rating.ratingVal;
    setRating({ title: "", review: "", ratingVal: 1 });
    const config = {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}reviews`,
        {
          title: thisTitle,
          review: thisReview,
          ratingVal: thisScore,
          user_name: poster_name,
          user_id: auth_id,
          movie_id: props.id,
          date_posted: new Date(),
          upvote_list: [],
          downvote_list: [],
        },
        config
      )
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
      });
    return true;
  }

  async function submitForm() {
    await handleSubmit(rating);
    setRating({ title: "", review: "", ratingVal: 1 });
  }

  return (
    <div>
      <StyledForm>
        <div>
          <Typography variant="h5">Rate it!</Typography>
          <Rating
            name="review-rating"
            max={7}
            defaultValue={1}
            onChange={handleChange}
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            name="review-title"
            label="Title (Required)"
            variant="outlined"
            fullWidth
            onChangeCapture={handleChange}
          />
        </div>

        <div>
          <TextField
            id="outlined-multiline-static"
            name="review-text"
            label="Review (Required)"
            multiline
            fullWidth
            rows={4}
            onChangeCapture={handleChange}
          />
        </div>

        <Box justifyContent="flex-end" display="flex">
          <Button variant="contained" onClick={submitForm} fullWidth={false}>
            Submit
          </Button>
        </Box>
      </StyledForm>
    </div>
  );
}

export default ReviewForm;
