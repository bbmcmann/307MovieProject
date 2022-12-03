import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile.css";
import getBackendUrl from "../util";

function ProfileLiked({ reviews }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (reviews) {
      function handleMovieList(movie_list) {
        let revs = reviews.filter((review) => review.ratingVal >= 5);
        revs.forEach(async function (review) {
          const result = await getMovie(review.movie_id);
          movie_list.push(result);
        });
        return movie_list;
      }
      const result = handleMovieList([]);
      setMovies(result);
    } else {
      console.log("No reviews");
    }
  }, [reviews]);

  async function getMovie(movie_id) {
    try {
      const res = await axios.get(`${getBackendUrl()}movies/${movie_id}`);
      const movie = res.data;
      return movie;
    } catch (error) {
      console.log(error);
      return false;
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
        //((reviews = reviews.filter((review) => review.ratingVal >= 5)),
        //(reviews.forEach((review) => getMovie(review.movie_id)),
        // handleMovieList(),
        <div className="movies">
          {movies?.map((movie) => {
            console.log(movie);
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
      ) : (
        <h3>--None--{console.log("Screw this")}</h3>
      )}
    </div>
  );
}

export default ProfileLiked;
