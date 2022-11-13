import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import React from "react";
import "./Movie.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

function Movie() {
  return (
    <>
      <div className="Movie-body">
        <div>
          {/* Need there to be change in color of the page*/}
          <Paper elevation={3} className="Movie-review">
            <h1>Movie Title</h1>
            <span className="Movie-poster-review-panel">
              <Paper elevation={3} className="Movie-poster">
                <img
                  src={require("../static/cartoon-banana.png")}
                  alt="Banana Poster"
                  height={300}
                  width={200}
                />
              </Paper>

              <span className="Movie-poster-review-panel">
                <span className="dot">
                  <Typography
                    paddingTop={10}
                    paddingLeft={8}
                    color="white"
                    fontSize={60}
                  >
                    3.25
                  </Typography>
                </span>
              </span>

              <Paper elevation={3} className="Movie-score">
                {/* <img src={require('./static/cartoon-banana.png')} alt="Banana Poster" height={300} width={200}/> */}
              </Paper>
            </span>
          </Paper>
        </div>

        <div>
          <Paper elevation={3} className="Movie-desc">
            {/* <div> */}
            <Typography variant="h5">Description:</Typography>
            <Typography variant="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            {/* </div> */}
          </Paper>
        </div>

        <div>
          <ReviewForm />
        </div>

        <div>
          <Typography variant="h4" className="Movie-desc">
            Reviews
          </Typography>
          <ReviewList />
        </div>
      </div>
      {/* <ReviewList/> */}
    </>
  );
}

export default Movie;
