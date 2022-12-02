import { Paper, List, ListItem } from "@mui/material";
import axios from "axios";
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

  useEffect(() => {
    if (props.id != -1) {
      //get suggested movies
      setOptions([]);

      try {
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}movies/suggested?user=${props.id}`
          )
          .then((res) => {
            setOptions(res.data);
          });
        //props.id
      } catch (error) {
        console.log(error);
      }
    } else {
      //get popular if prop.id == -1
      try {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}movies/popular`)
          .then((res) => {
            setOptions(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [props.id]);

  const handleClick = (event) => {
    // function to handle when user selects an option
    const value = event.target;
    console.log(value.alt);
    navigate(`../${value.alt}`);
  };

  // console.log(props.id)

  return (
    <div>
      {props.id ? <h1> RECOMMENDED MOVIES</h1> : <h1>Suggested Movies</h1>}
      <div>
        <List>
          {options.length > 0 ? (
            <>
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
            </>
          ) : (
            <h2>No recommendations at this time, please leave more reviews!</h2>
          )}
        </List>
      </div>
    </div>
  );
}

export default MovieList;
