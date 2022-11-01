import { Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile.css";
import ProfileLiked from "./ProfileLiked";

function Profile({ id }) {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const usr = {
    username: "theJohnSmith",
    first_name: "John",
    last_name: "Smith",
    pun: "How is a Banana Peel on the floor like music? Bc if you don’t C sharp you’ll B flat",
    movies: [
      {
        id: 1,
        poster_path: "/zq8Cl3PNIDGU3iWNRoc5nEZ6pCe.jpg",
      },
      {
        id: 2,
        poster_path: "/zq8Cl3PNIDGU3iWNRoc5nEZ6pCe.jpg",
      },
      {
        id: 3,
        poster_path: "/zq8Cl3PNIDGU3iWNRoc5nEZ6pCe.jpg",
      },
      {
        id: 4,
        poster_path: "/zq8Cl3PNIDGU3iWNRoc5nEZ6pCe.jpg",
      },
    ],
  };

  useEffect(() => {
    // fetch user info based on id
    setUser(usr);
  }, [id]);

  const navigateEdit = () => {
    navigate("/profile/edit");
  };

  return (
    <Paper className="profile" elevation={2}>
      <h1 className="profile-header">&#127820;User Profile&#127820;</h1>
      <hr />
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
        <ProfileLiked movies={user.movies} />
      </div>
    </Paper>
  );
}

export default Profile;
