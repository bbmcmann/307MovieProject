import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import ReviewList from "./components/ReviewList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />

          {/* Movie paths */}
          <Route path="movie">
            <Route index element={<p>generic movie page</p>} />
            <Route path="popular" element={<p>popular movie page</p>} />
            <Route path="recommend" element={<p>recommend movie page</p>} />
            <Route path=":movieId" element={<Movie />} />
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
            <Route index element={<p>my profile page</p>} />
            <Route path=":id" element={<p>profile w id page</p>} />
            <Route path="edit" element={<p>edit profile page</p>} />
            <Route path="*" element={<h1>404 page not found</h1>} />
          </Route>

          <Route path="*" element={<h1>404 page not found</h1>} />
        </Route>

        {/* Auth paths */}
        <Route path="login" element={<p>login page</p>} />
        <Route path="signup" element={<p>signup page</p>} />

        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
