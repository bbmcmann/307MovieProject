import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import Profile from "./components/profile/Profile";
import ProfileEdit from "./components/profile/ProfileEdit";
import ReviewList from "./components/ReviewList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />

          {/* Movie paths */}
          <Route path="movie">
            <Route
              index
              element={<p>Use the search bar to search for a movie!</p>}
            />
            <Route path="popular" element={<p>popular movie page</p>} />
            <Route path="suggested" element={<p>recommend movie page</p>} />
            <Route path=":id" element={<Movie />} />
            <Route path="*" element={<h1>404 page not found</h1>} />
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
            <Route path=":id" element={<Profile />} />
            <Route path="edit/:id" element={<ProfileEdit />} />
            <Route path="*" element={<h1>404 page not found</h1>} />
          </Route>

          <Route path="*" element={<h1>404 page not found</h1>} />
        </Route>

        {/* Auth paths */}
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
