import { Paper, List, ListItem } from "@mui/material";
import axios from "axios";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import env from 

const StyledPaper = styled(Paper)`
  border: 1px solid #d9d9d9;
  width: 800px;
  margin: auto;
  margin-bottom: 10px;
  padding-top: 25px;
  padding-bottom: 25px;
  box-shadow: 5px 5px 5px gray;
  text-align: center;
`;

function MovieList(props) {
  const [options, setOptions] = useState([]);
  const [input] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptions = useCallback(
    (text, callback) => {
      try {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}movies/suggested`)
          .then((res) => res.data)
          .then(callback);
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    getOptions(input, (newOptions) => {
      setOptions(newOptions);
    });
  }, [input, getOptions]);

  const handleClick = (event) => {
    // function to handle when user selects an option
    const value = event.target;
    console.log(value.alt);
    navigate(`../${value.alt}`);
  };

  return (
    <div>
      <h1>Suggested Movies</h1>
      <List>
        {options.map((value) => (
          <ListItem key={`${value.id}`}>
            <StyledPaper elevation={3} className="Movie-body">
              <span className="Movie-poster-review-panel">
                <Paper elevation={3} className="Movie-poster">
                  <img
                    loading="lazy"
                    width="250"
                    src={`https://image.tmdb.org/t/p/original/${value.poster_path}`}
                    className="Movie-poster"
                    alt={value.id}
                    onClick={handleClick}
                  />
                </Paper>
                <span className="Movie-body">
                  <h2>{value.title}</h2>
                  <p>{value.overview}</p>
                </span>
              </span>
            </StyledPaper>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MovieList;
