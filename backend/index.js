const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const userEndpoints = require("./routes/userRoutes.js");
const movieEndpoints = require("./routes/movieRoutes.js");
const revEndpoints = require("./routes/reviewRoutes.js");
const { login, signup } = require("./routes/auth.js");

app.use(logger);

app.use("/movies", movieEndpoints);
app.use("/users", userEndpoints);
app.use("/reviews", revEndpoints);
app.post("/login", login);
app.post("/signup", signup);

function logger(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();
  console.log(`Completed response`);
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
