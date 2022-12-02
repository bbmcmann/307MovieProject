const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/userSchema.js");
const { addUser } = require("./userServices.js");
require("dotenv").config();

const User = UserSchema.Users;

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
}

async function login(username, password) {
  // Call a model function to retrieve an existing user based on id
  try {
    const retrievedUser = await User.findOne({ username: username });
    if (retrievedUser) {
      const isValid = await bcrypt.compare(password, retrievedUser.password);
      if (isValid) {
        // Generate token and respond
        const token = generateAccessToken({
          id: retrievedUser._id,
          username: username,
        });
        return { id: retrievedUser._id, token: token };
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function signup(username, password, fname, lname, email) {
  const maybeUser = await User.findOne({ username: username });
  if (maybeUser && username === maybeUser.username) {
    //Conflicting usernames. Assuming it's not allowed, then:
    throw new Error("Username already taken");
  } else {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // On the database you never store the user input password.
    // So, let's hash it:
    const hashedPwd = await bcrypt.hash(password, salt);
    // Now, call a model function to store the username and hashedPwd (a new user)
    // For demo purposes, I'm skipping the model piece, and assigning the new user to this fake obj
    const newUser = {
      username: username,
      first_name: fname,
      last_name: lname,
      email: email,
      password: hashedPwd,
      reviews: [],
    };
    await addUser(newUser);

    return true;
  }
}

/* Using this funcion as a "middleware" function for
  all the endpoints that need access control protecion */
function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth hearder (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    return res.status(401).end();
  } else {
    // If a callback is supplied, verify() runs async
    // If a callback isn't supplied, verify() runs synchronously
    // verify() throws an error if the token is invalid
    try {
      // verify() returns the decoded obj which includes whatever objs
      // we use to code/sign the token
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).end();
        req.user = user;
        next();
      });
    } catch (error) {
      console.log("ERROR");
      console.log(error);

      return res.status(401).end();
    }
  }
}

exports.generateAccessToken = generateAccessToken;
exports.login = login;
exports.signup = signup;
exports.authenticateUser = authenticateUser;
