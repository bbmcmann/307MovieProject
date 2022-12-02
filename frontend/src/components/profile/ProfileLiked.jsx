import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile.css";

function ProfileLiked({ reviews }) {
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  /* function moviesList() {
    let mov_list = []
    reviews.forEach((review) => mov_list.push(getMovie(review.movie_id)))
    return mov_list;
  } */

  async function getMovie(movie_id) {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}movies/${movie_id}`
      );
      setMovie(res.data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="liked-section">
      <h3>Movies I like:</h3>
      {reviews ? (
        ((reviews = reviews.filter((rev) => rev.ratingVal >= 5)),
        (
          <div className="movies">
            {reviews?.map((review) => {
              getMovie(review.movie_id);
              return (
                <img
                  key={movie._id}
                  className="poster"
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt="movie poster"
                  onClick={() => handleClick(movie._id)}
                />
              );
            })}
          </div>
        ))
      ) : (
        <h3>--None--</h3>
      )}
    </div>
  );
}

export default ProfileLiked;
