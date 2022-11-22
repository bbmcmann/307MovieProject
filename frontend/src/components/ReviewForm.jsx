import { Box, Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import styled from "styled-components";
// import "./Movie.css";

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

  function submitForm() {
    props.handleSubmit(rating);
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
