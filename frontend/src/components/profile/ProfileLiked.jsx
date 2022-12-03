import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile.css";
import getBackendUrl from "../util";

function ProfileLiked({ reviews }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMovieList = async () => {
      let revs = reviews?.filter((review) => review.ratingVal >= 5);
      let movie_list = await Promise.all(
        revs?.map(async function (review) {
          const result = await getMovie(review.movie_id);
          return result;
        })
      );
      setMovies(movie_list);
    };
    handleMovieList();
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

  return (
    <div className="liked-section">
      <h3>Liked Movies :</h3>
      {reviews ? (
        <div className="movies">
          {movies?.map((movie) => {
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
        <h3>--None--</h3>
      )}
    </div>
  );
}

export default ProfileLiked;
