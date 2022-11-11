const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const userEndpoints = require("./routes/user-services.js");
const movieEndpoints = require("./routes/movieRoutes.js");

app.use("/movies", movieEndpoints);
app.use("/users", userEndpoints);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
