import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
// import "./Movie.css";

// function setValue=
const StyledForm = styled(Paper)`
  backgroundColor: #0000FF
  text-align: left;
  padding-top: 25px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
`;

function ReviewForm() {
  let Val = 0;
  const [rating, setRating] = useState({
    title: "",
    review: "",
    ratingVal: 0,
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

  console.log(rating);

  // function submitForm() {
  // }

  return (
    <>
      {/* <Paper className="Movie-desc"> */}

      <StyledForm>
        <div>
          <Typography variant="h5">
              Rate it!
          </Typography>
          <Rating name="review-rating" max={7} onChange={handleChange} />
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
          {/* <TextField
            id="outlined-basic"
            label="Review (Required)"
            variant="outlined"
            name="review-text"
            fullWidth
            onChangeCapture={handleChange}
          /> */}
        </div>
      </StyledForm>
    </>
  );
}

export default ReviewForm;
