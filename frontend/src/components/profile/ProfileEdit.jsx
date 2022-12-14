import { Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { StyledForm, StyledSubmit } from "../StyledComponents.jsx";
import getBackendUrl from "../util.jsx";

function ProfileEdit() {
  const username = useRef();
  const fname = useRef();
  const lname = useRef();
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  const cookies = new Cookies();

  const navigate = useNavigate();

  const curUser = {};

  const { id } = useParams();

  useEffect(() => {
    // fetch user info based on id
    if (id) {
      axios
        .get(`${getBackendUrl()}users/${id}`)
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
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      };
      const response = await axios.patch(
        `${getBackendUrl()}users/${id}`,
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
    /* if you are authorized and you are on your page */
    cookies.get("token") && cookies.get("userId") === id ? (
      <Paper className="profile" elevation={2}>
        <h1 className="profile-header">&#127820;Edit Profile&#127820;</h1>
        <hr />
        <StyledForm className="edit-form" onSubmit={handleSubmit}>
          <TextField label="Username" inputRef={username} error={error} />
          <TextField label="First Name" inputRef={fname} error={error} />
          <TextField label="Last Name" inputRef={lname} error={error} />
          <br></br>
          <StyledSubmit type="submit" value="Submit" />
        </StyledForm>
      </Paper>
    ) : /* check to see if you're signed in or not */
    cookies.get("token") ? (
      navigate("/profile/" + id)
    ) : (
      navigate("/login")
    )
  ) : null;
}

export default ProfileEdit;
