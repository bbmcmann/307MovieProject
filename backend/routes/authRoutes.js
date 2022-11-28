const express = require("express");
const router = express.Router();
const { login, signup } = require("./authServices.js");

// POST /auth/login
// @params username: string, password: string
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const token = await login(username, password);
  if (token) {
    res.status(200).send(token);
  } else {
    res.status(401).send("Unauthorized");
  }
});

// POST auth/signup
// @params username: string, password: string, first_name: string, last_name: string, email: string
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const userPwd = req.body.password;
  if (!username && !userPwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    try {
      const token = await signup(
        username,
        userPwd,
        req.body.first_name,
        req.body.last_name,
        req.body.email
      );
      res.status(201).send(token);
    } catch (error) {
      res.status(400).send(error);
    }
  }
});

module.exports = router;
