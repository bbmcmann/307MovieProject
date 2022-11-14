import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOption(props) {
  return (
    <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
      <img
        loading="lazy"
        width="50"
        src={`https://image.tmdb.org/t/p/original/${props.option.poster_path}`}
        alt=""
      />
      {props.option.title}
    </Box>
  );
}

function Search() {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptionsDelayed = useCallback(
    // delay api call for 500 ms
    debounce((text, callback) => {
      try {
        axios
          .get(`http://localhost:5000/movies/search?query=${text}`)
          .then((res) => res.data)
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
    }
  }, [input, getOptionsDelayed]);

  const handleSelect = (event, value) => {
    // function to handle when user selects an option
    navigate(`movie/${value.id}`);
  };

  return (
    <Autocomplete
      freeSolo
      id="movieSearch"
      sx={{
        width: 300,
        background: "#FFFFFF",
        borderRadius: 1,
        overflow: "hidden",
      }}
      options={options}
      getOptionLabel={(option) => option.title}
      filterOptions={(x) => x}
      noOptionsText="No movies found"
      loading={loading}
      onInputChange={(e, newInput) => setInput(newInput)}
      renderOption={(props, option) => (
        <SearchOption {...props} option={option} key={option.id} />
      )}
      renderInput={(params) => <TextField {...params} label="Search" />}
      onClose={() => {
        setOptions([]);
      }}
      onChange={handleSelect}
    />
  );
}

export default Search;
