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
          <Route index element={<p>home</p>} />
          <Route path="movie" element={<p>movie page</p>}>
            <Route path=":movieId" element={<p>movieId page</p>} />
          </Route>
          <Route path="review" element={<p>generic review page</p>} />
          <Route path="review/:reviewId" element={<p>reviewId page</p>} />
          <Route path="profile" element={<Outlet />}>
            <Route index element={<p>my profile page</p>} />
            <Route path=":id" element={<p>profile w id page</p>} />
            <Route path="edit" element={<p>edit profile page</p>} />
          </Route>
        </Route>
        <Route path="login" element={<p>login page</p>} />
        <Route path="signup" element={<p>signup page</p>} />
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
