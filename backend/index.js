const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const userEndpoints = require("./routes/user-services.js");
const movieEndpoints = require("./routes/movieRoutes.js");

app.use("/movies", movieEndpoints);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  let id;
  try {
    const result = await userEndpoints.getUsers(id);
    res.status(200).send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(505).send("An error occurred in the server");
  }
});

app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  const result = await userEndpoints.addUser(userToAdd);
  if (result) {
    res.status(201).send(result);
  } else {
    res.status(500).end();
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const result = await userEndpoints.getUsers(id);
    res.status(200).send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(505).send("An error occurred on the system");
  }
});

app.patch("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const username = req.body.username;
  const first = req.body.first_name;
  const last = req.body.last_name;
  try {
    const result = await userEndpoints.updateUserById(
      id,
      username,
      first,
      last
    );
    res.status(200).send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(505).send("An error occurred on the system");
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userEndpoints.deleteUserById(id);
  if (!result) {
    res.status(404).send("Resource not found");
  } else {
    res.status(204).end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
