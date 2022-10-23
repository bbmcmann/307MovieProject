import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Search() {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const getOptionsDelayed = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&query=${input}&include_adult=false`
        );
        console.log(res.data.results);
        setOptions(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    if (input) getOptionsDelayed();
  }, [input]);

  return (
    <Autocomplete
      id="movieSearch"
      sx={{ width: 300 }}
      options={options}
      getOptionLabel={(option) => option.title}
      filterOptions={(x) => x}
      noOptionsText="No movies found"
      // loading={false}
      onInputChange={(e, newInput) => setInput(newInput)}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
          key={option.id}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://image.tmdb.org/t/p/original/${option.poster_path}`}
            alt=""
          />
          {option.title}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label="Movie" />}
      onClose={() => {
        setOptions([]);
      }}
    />
  );
}

export default Search;
