import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Movie.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { StyledCon } from "./StyledComponents.jsx";
import getBackendUrl from "./util";

function Movie() {
  const [movie, setMovie] = useState({});
  const [err, setErr] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`${getBackendUrl()}movies/${id}`)
        .then((res) => {
          setMovie(res.data);
          if (res.data.reviews) {
            setReviews(res.data.reviews);
          }
        })
        .catch((err) => {
          console.log(err);
          setErr(true);
        });
    }
  }, [id]);

  const updateReviews = (newReview) => {
    console.log(reviews);
    setReviews([...reviews, newReview]);
  };

  return (
    <div className="Movie-body">
      {err ? (
        <h2>Movie not found</h2>
      ) : (
        <>
          <Paper elevation={3} className="Movie-review">
            <h1>{movie?.title}</h1>
            <span className="Movie-poster-review-panel">
              <Paper elevation={3} className="Movie-poster">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt="Movie Poster"
                  height={300}
                  width={200}
                />
              </Paper>
              <span className="Movie-poster-review-panel">
                <div className="dot">
                  <Typography color="white" fontSize={60}>
                    {movie?.score ? movie.score : "--"}
                  </Typography>
                </div>
              </span>
              <Paper elevation={3} className="Movie-score" />
            </span>
          </Paper>
          <StyledCon>
            <Typography variant="h5">Description:</Typography>
            <Typography variant="p">{movie?.description}</Typography>
          </StyledCon>
          <ReviewForm id={id} update={updateReviews} />
          <Typography variant="h4" className="Movie-desc">
            Reviews
          </Typography>
          <ReviewList reviews={reviews} />
        </>
      )}
    </div>
  );
}

export default Movie;
