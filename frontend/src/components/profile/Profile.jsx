import { Button, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Profile.css";
import ProfileLiked from "./ProfileLiked";

function Profile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // fetch user info based on id
    if (id) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}users/${id}`)
        .then((res) => setUser(res.data.users_list))
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    } else {
      setError(true);
    }
  }, [id]);

  const navigateEdit = () => {
    navigate("/profile/edit");
  };

  return (
    <Paper className="profile" elevation={2}>
      <h1 className="profile-header">&#127820;User Profile&#127820;</h1>
      <hr />
      {error ? (
        <h2>User not found</h2>
      ) : (
        <div className="container">
          <div className="info">
            <span>
              <strong>{`${user.username} - `}</strong>
            </span>
            <span>
              <em>{`${user.first_name} ${user.last_name}`}</em>
            </span>
            <p>&#127820;Favorite Pun-ana</p>
            <p>{user.pun}</p>
            {/* Need to add logic to check if profile being viewed is their own profile */}
            {user ? (
              <Button variant="contained" onClick={navigateEdit}>
                Edit
              </Button>
            ) : null}
          </div>
          <ProfileLiked movies={user.reviews} />
        </div>
      )}
    </Paper>
  );
}

export default Profile;
