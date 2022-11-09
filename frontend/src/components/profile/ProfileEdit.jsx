import { Button, Paper, TextField } from "@mui/material";
import React, { useRef, useState } from "react";

function ProfileEdit() {
  const username = useRef();
  const fname = useRef();
  const lname = useRef();
  const [error, setError] = useState(false);

  const curUser = {};

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
    console.log(username.current.value);
    console.log(fname.current.value);
    console.log(lname.current.value);
  };

  return curUser ? (
    <Paper className="profile" elevation={2}>
      <h1 className="profile-header">&#127820;Edit Profile&#127820;</h1>
      <hr />
      <form className="edit-form" onSubmit={handleSubmit}>
        <TextField label="Username" inputRef={username} error={error} />
        <TextField label="First Name" inputRef={fname} error={error} />
        <TextField label="Last Name" inputRef={lname} error={error} />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Paper>
  ) : null;
}

export default ProfileEdit;
