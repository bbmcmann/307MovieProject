const mongoose = require("mongoose");
const UserSchema = require("../models/users");
const {
  generateAccessToken,
  login,
  signup,
} = require("../routes/authServices.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Users = UserSchema.Users;
let id;

beforeAll(async () => {
  const newUser = new Users({
    username: "joedidi",
    first_name: "JOE",
    last_name: "DIDI",
    email: "test@email.com",
    password: "$2b$10$9zZAZDT/eKrnD7XFjggWbOb003krKHykjJZA7r4qluY25MmWXH3LS",
  });
  await newUser.save();
  id = newUser._id;
});

afterAll(async () => {
  await Users.findByIdAndDelete(id);
  await mongoose.disconnect();
});

describe("generate token", () => {
  test("test 1", () => {
    const result = generateAccessToken({
      id: id,
      username: "joedidi",
    });
    expect(result).toBeTruthy();
  });
});

describe("login", () => {
  test("valid", async () => {
    const result = await login("joedidi", "ilovebananas");
    expect(result).not.toBeNull();
    jwt.verify(result, process.env.TOKEN_SECRET, (err, user) => {
      expect(user.username).toBe("joedidi");
      expect(JSON.stringify(user.id)).toEqual(JSON.stringify(id));
    });
  });

  test("invalid - wrong password", async () => {
    const result = await login("joedidi", "ihatebananas");
    expect(result).toBeNull();
  });

  test("invalid - no user", async () => {
    const result = await login("notausername", "ilovebananas");
    expect(result).toBeNull();
  });
});

describe("signup", () => {
  test("success", async () => {
    await Users.deleteMany({ username: "test" });
    const newUser = {
      username: "test",
      password: "ilovebananas",
      first_name: "joe",
      last_name: "meimei",
      email: "another@email.com",
    };
    const result = await signup(
      newUser.username,
      newUser.password,
      newUser.first_name,
      newUser.last_name,
      newUser.email
    );
    expect(result).not.toBeNull();
    jwt.verify(result, process.env.TOKEN_SECRET, async (err, user) => {
      expect(user.username).toBe("test");
      expect(user.id).toBeTruthy();
    });
    await Users.deleteMany({ username: "test" });
  });

  test("username already exists", async () => {
    await expect(signup("joebaba", "password")).rejects.toThrow(
      "Username already taken"
    );
  });
});
