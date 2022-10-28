import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <p>header</p>
              <Outlet />
            </div>
          }
        >
          <Route index element={<p>home page</p>} />

          {/* Movie paths */}
          <Route path="movie">
            <Route index element={<p>generic movie page</p>} />
            <Route path="popular" element={<p>popular movie page</p>} />
            <Route path="recommend" element={<p>recommend movie page</p>} />
            <Route path=":movieId" element={<p>movieId page</p>} />
            <Route path="*" element={<h1>404 page not found</h1>} />
          </Route>

          {/* Review paths */}
          <Route path="review">
            <Route index element={<p>generic review page</p>} />
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
