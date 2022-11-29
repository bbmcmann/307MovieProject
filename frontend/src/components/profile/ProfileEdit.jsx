import axios from "axios";
import { Button, Paper, TextField } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StyledForm } from "../StyledComponents.jsx";
// import { Cookies } from "react-cookie";

function ProfileEdit(props) {
  const username = useRef();
  const fname = useRef();
  const lname = useRef();
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  // const cookies = new Cookies();

  const navigate = useNavigate();

  const curUser = {};

  const { id } = useParams();

  useEffect(() => {
    // fetch user info based on id
    if (id) {
      axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => setUser(res.data.users_list))
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    } else {
      setError(true);
    }
  }, [id]);

  async function makeUpdateCall(id) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${props.token}` },
      };
      const response = await axios.patch(
        `http://localhost:5000/users/${id}`,
        user,
        config
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateUser() {
    if (username.current.value !== "") {
      user.username = username.current.value;
    }
    if (fname.current.value !== "") {
      user.first_name = fname.current.value;
    }
    if (lname.current.value !== "") {
      user.last_name = lname.current.value;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !username.current.value &&
      !fname.current.value &&
      !lname.current.value
    ) {
      setError(true);
      return;
    }
    console.log("submit clicked");
    updateUser();
    makeUpdateCall(id).then((result) => {
      if (result && result.status === 200) {
        setUser(result.data);
      } else {
        console.log(error);
      }
    });
    navigate("/profile/" + id); // doesn't automatically update it
  };

  return curUser ? (
    <Paper className="profile" elevation={2}>
      <h1 className="profile-header">&#127820;Edit Profile&#127820;</h1>
      <hr />
      <StyledForm className="edit-form" onSubmit={handleSubmit}>
        <TextField label="Username" inputRef={username} error={error} />
        <TextField label="First Name" inputRef={fname} error={error} />
        <TextField label="Last Name" inputRef={lname} error={error} />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </StyledForm>
    </Paper>
  ) : null;
}

export default ProfileEdit;
