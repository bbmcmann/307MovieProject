const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const movieEndpoints = require("./routes/movieRoutes.js");

app.use(logger);

app.use("/api/movie", movieEndpoints);

function logger(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();
  console.log(`Completed with status code: ${res.statusCode}`);
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
