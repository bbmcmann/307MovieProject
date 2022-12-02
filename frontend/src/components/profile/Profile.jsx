import { Button, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Profile.css";
import ProfileLiked from "./ProfileLiked";
import { StyledSubmit } from "../StyledComponents";

function Profile(props) {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  const cookies = new Cookies();

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
    navigate("/profile/edit/" + id);
  };

  /* remove cookies by signing out */
  function removeCookies() {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    props.setUserId("");
  }

  function navigateHome() {
    navigate("/");
  }

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
            <p className="pun">Favorite Pun-ana</p>
            {user.fav_pun ? (
              <p>
                &#127820;{`${user.fav_pun.question}`}
                <br></br>&#127820;{`${user.fav_pun.answer}`}
              </p>
            ) : null}
            {/* Need to add logic to check if profile being viewed is their own profile */}
            {cookies.get("token") && cookies.get("userId") === id ? (
              <Button variant="contained" onClick={navigateEdit}>
                Edit
              </Button>
            ) : null}
            {/* probably better way to do this like with margins but I'm lazy right now*/}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {cookies.get("token") && cookies.get("userId") === id ? (
              <StyledSubmit
                type="submit"
                value="Sign Out"
                /* it worked better when I split these up */
                onClick={() => {
                  removeCookies();
                  navigateHome();
                }}
              />
            ) : null}
          </div>
          <ProfileLiked movies={user.reviews} />
        </div>
      )}
    </Paper>
  );
}

export default Profile;
