const mongoose = require("mongoose");
const UserSchema = require("../models/userSchema");
const {
  generateAccessToken,
  login,
  signup,
  authenticateUser,
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
    expect(result.id).not.toBeNull();
    jwt.verify(result.token, process.env.TOKEN_SECRET, (err, user) => {
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
    expect(result).toBeTruthy();
    await Users.deleteMany({ username: "test" });
  });

  test("username already exists", async () => {
    await expect(signup("joebaba", "password")).rejects.toThrow(
      "Username already taken"
    );
  });
});

describe("Authorization middleware", () => {
  const mockRequest = (token) => {
    return {
      headers: { authorization: token },
    };
  };

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);
    return res;
  };

  let token;
  beforeEach(() => {
    token = generateAccessToken({
      id: "637bdb3ca068d7ffa9ae75e2",
      username: "JoeMama",
    });
  });

  test("without headers", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const nextFunc = jest.fn();
    await authenticateUser(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(401);
    expect(nextFunc).toBeCalledTimes(0);
  });

  test('with "authorization" header - valid token', async () => {
    const req = mockRequest(`Bearer ${token}`);
    const res = mockResponse();
    const nextFunc = jest.fn();
    await authenticateUser(req, res, nextFunc);
    expect(nextFunc).toBeCalledTimes(1);
  });

  test('with "authorization" header - invalid token', async () => {
    const req = mockRequest(`Bearer someinvalidtoken`);
    const res = mockResponse();
    const nextFunc = jest.fn();
    await authenticateUser(req, res, nextFunc);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(nextFunc).toBeCalledTimes(0);
  });
});
