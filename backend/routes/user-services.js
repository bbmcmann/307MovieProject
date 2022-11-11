const express = require("express");
const router = express.Router();
const Users = require("../models/users");

router.get("/", async (req, res) => {
  let id;
  try {
    const result = await getUsers(id);
    res.status(200).send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(505).send("An error occurred in the server");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const result = await getUsers(id);
    res.status(200).send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(505).send("An error occurred on the system");
  }
});

router.post("/", async (req, res) => {
  const userToAdd = req.body;
  const result = await addUser(userToAdd);
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
    const result = await updateUserById(id, username, first, last);
    res.status(200).send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(505).send("An error occurred on the system");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await deleteUserById(id);
  if (!result) {
    res.status(404).send("Resource not found");
  } else {
    res.status(204).end();
  }
});

async function getUsers(id) {
  let result;
  if (id) {
    result = await findUserById(id);
  } else if (id === undefined) {
    result = await Users.find();
  }
  return result;
}

async function findUserById(id) {
  try {
    return await Users.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new Users(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateUserById(id, username, first, last) {
  try {
    const result = await Users.updateOne(
      { _id: id },
      { $set: { username: username, first_name: first, last_name: last } }
    );
    if (result.acknowledged) {
      return findUserById(id);
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteUserById(id) {
  try {
    const remUser = await Users.findByIdAndDelete(id);
    return remUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  router,
  getUsers,
  addUser,
  updateUserById,
  deleteUserById,
};
