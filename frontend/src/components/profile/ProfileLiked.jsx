import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile.css";

function ProfileLiked({ reviews }) {
  const movies = useState(handleMovieList(reviews));
  const navigate = useNavigate();

  async function getMovie(movie_id) {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}movies/${movie_id}`
      );
      const movie = res.data;
      console.log(movie);
      return movie;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function handleMovieList(reviews) {
    if (reviews) {
      let movie_list = [];
      reviews = reviews.filter((review) => review.ratingVal >= 5);
      reviews.forEach((review) => movie_list.push(getMovie(review.movie_id)));
      return movie_list;
    } else {
      console.log("No Reviews");
    }
  }

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  // logging this info twice, once with blank and then with the info we want
  console.log(reviews);
  console.log(movies);

  return (
    <div className="liked-section">
      <h3>Liked Movies :</h3>
      {reviews ? (
        ((reviews = reviews.filter((review) => review.ratingVal >= 5)),
        (reviews.forEach((review) => getMovie(review.movie_id)),
        (
          // handleMovieList(),
          <div className="movies">
            {movies?.map((movie) => {
              console.log(movies);
              return (
                <img
                  key={movie._id}
                  className="poster"
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt="movie poster"
                  onClick={() => handleClick(movie.id)}
                />
              );
            })}
          </div>
        )))
      ) : (
        <h3>--None--</h3>
      )}
    </div>
  );
}

export default ProfileLiked;
