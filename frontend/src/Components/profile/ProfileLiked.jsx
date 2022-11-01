import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile.css";

function ProfileLiked({ movies }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="liked-section">
      <h3>Movies I like:</h3>
      <div className="movies">
        {movies?.map((movie) => {
          return (
            <img
              key={movie.id}
              className="poster"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt=""
              onClick={() => handleClick(movie.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProfileLiked;
