import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Cookies } from "react-cookie";
import axios from "axios";

function Pun() {
  const [user, setUser] = useState({});
  const cookies = new Cookies();
  let pun_q = [
    "How is a banana peel on the floor similar to music?",
    "Why don't bananas snore?",
    "Why do banana have to wear sunscreen?",
    "What do you call a banana who gets all the girls?",
    "I was walking down the street when I stood on a banana?",
    "What's the difference between time and bananas?",
  ];
  let pun_a = [
    "Because if you don't C Sharp you'll B Flat",
    "Because they don't want to wake up the rest of the bunch",
    "Because they peel",
    "A banana smoothie",
    "Luckily, I was wearing my SlipKnot t-shirt",
    "Time flies like an arrow, fruit flies like a banana",
  ];
  let randomNum = Math.floor(Math.random() * pun_q.length);

  const id = cookies.get("userId");

  useEffect(() => {
    // fetch user info based on id
    if (id) {
      axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => setUser(res.data.users_list))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const handleSubmit = () => {
    user.fav_pun = { question: pun_q[randomNum], answer: pun_a[randomNum] };
    makeUpdateCall(id);
  };

  async function makeUpdateCall(id) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
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

  return (
    <div className="App-body">
      <h2 className="App-h2">&#127820; Pun-ana of the Day : &#127820;</h2>
      &#x1F34C;{pun_q[randomNum]}
      <br></br>
      <br></br>
      &#x1F34C;{pun_a[randomNum]}
      <br></br>
      <br></br>
      {/* need to have the button only show up if user is logged in / verified */}
      {cookies.get("token") ? (
        <Button variant="contained" onClick={handleSubmit}>
          Favorite
        </Button>
      ) : null}
    </div>
  );
}

export default Pun;
