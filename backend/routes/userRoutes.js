const express = require("express");
const router = express.Router();
const userServices = require("./user-services");

router.get("/", async (req, res) => {
  let id;
  try {
    const result = await userServices.getUsers(id);
    res.status(200).send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(505).send("An error occurred in the server");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const result = await userServices.getUsers(id);
    res.status(200).send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(505).send("An error occurred on the system");
  }
});

router.post("/", async (req, res) => {
  const userToAdd = req.body;
  const result = await userServices.addUser(userToAdd);
  if (result) {
    res.status(201).send(result);
  } else {
    res.status(500).end();
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params["id"];
  const username = req.body.username;
  const first = req.body.first_name;
  const last = req.body.last_name;
  try {
    const result = await userServices.updateUserById(id, username, first, last);
    res.status(200).send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(505).send("An error occurred on the system");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.deleteUserById(id);
  if (!result) {
    res.status(404).send("Resource not found");
  } else {
    res.status(204).end();
  }
});

module.exports = router;