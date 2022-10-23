import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";

function Search() {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getOptionsDelayed = useCallback(
    // delay api call for 500 ms
    debounce((text, callback) => {
      try {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&query=${text}&include_adult=false`
          )
          .then((res) => res.data.results)
          .then(callback);
      } catch (error) {
        console.log(error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (input) {
      setLoading(true);
      getOptionsDelayed(input, (newOptions) => {
        setOptions(newOptions);
        setLoading(false);
      });
    } else {
      // reset options when user deletes whole input
      setOptions([]);
    }
  }, [input, getOptionsDelayed]);

  return (
    <Autocomplete
      id="movieSearch"
      sx={{ width: 300 }}
      options={options}
      getOptionLabel={(option) => option.title}
      filterOptions={(x) => x}
      noOptionsText="No movies found"
      loading={loading}
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
