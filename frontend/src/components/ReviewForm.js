import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import "./Movie.css";

// function setValue=

function ReviewForm() {
  let Val = 0;
  const [rating, setRating] = useState({
    title: "",
    review: "",
    ratingVal: 0,
  });

  function handleChange(event){
    const{name, value} = event.target;
    if (name === "review-rating")
    //TODO: Figure out why it takes 2 updates to actually
    //update the rating vales
        setRating({
            title: rating['title'],
            review: rating['review'],
            ratingVal: value
        });
    else if (name === "review-title")
        setRating({
            title: value,
            review: rating['review'],
            ratingVal: rating['ratingVal']
        });
    else
        setRating({
            title: rating['title'],
            review: value,
            ratingVal: rating['ratingVal']
        });
    console.log(rating);
  }

  function submitForm(){
    //TODO: Edit to submit to an actual Database
    //For now will append to an array


  }


  return (
    <>
      <Paper className="Movie-desc">
        <Rating
          name="review-rating"
          //Val={value}
          
        //   onChange={(event, newValue) => {
        //     Val = { newValue };
        //     console.log(Val);
        //   }}


        onChange={handleChange}

        />
        <TextField
          id="outlined-basic"
          name="review-title"
          label="Title (Required)"
          variant="outlined"
          fullWidth
          onChangeCapture={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Review (Required)"
          variant="outlined"
          name="review-text"
          fullWidth
          onChangeCapture={handleChange}
        />
      </Paper>
    </>
  );
}

export default ReviewForm;
