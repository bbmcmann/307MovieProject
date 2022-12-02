import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import MovieList from "./components/MovieList";
import Profile from "./components/profile/Profile";
import ProfileEdit from "./components/profile/ProfileEdit";
import ReviewList from "./components/ReviewList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  const storedId = localStorage.getItem("userId");
  const [userId, setUserId] = useState(storedId);

  /* locally store the ID in case the page refreshes */
  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header id={userId} />}>
          <Route index element={<Home />} />

          {/* Movie paths */}
          <Route path="movie">
            <Route
              index
              element={<p>Use the search bar to search for a movie!</p>}
            />
            <Route path="popular" element={<MovieList id={-1} />} />
            <Route path="suggested" element={<MovieList id={userId}/>} />
            <Route path=":id" element={<Movie />} />
            <Route path="*" element={<h1>404 page not not found</h1>} />
          </Route>

          {/* Review paths */}
          <Route path="review">
            <Route index element={<ReviewList />} />
            <Route path=":reviewId" element={<p>reviewId page</p>} />
            <Route path="*" element={<h1>404 page not found</h1>} />
          </Route>

          {/* Profile paths */}
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path=":id" element={<Profile setUserId={setUserId} />} />
            <Route path="edit/:id" element={<ProfileEdit />} />
            <Route path="*" element={<h1>404 page not found</h1>} />
          </Route>

          <Route path="*" element={<h1>404 page not found</h1>} />
        </Route>

        {/* Auth paths */}
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<SignIn setUserId={setUserId} />} />
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
