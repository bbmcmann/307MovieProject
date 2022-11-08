const mongoose = require("mongoose");
const UserSchema = require("../models/users");
const userServices = require("../routes/user-services");
const db = require("../db.js");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let userModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = mongoose.createConnection(uri, mongooseOpts);

  userModel = UserSchema;

  db.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  let dummyUser = {
    username: "chucky",
    first_name: "Chuck",
    last_name: "Norris",
    email: "chuck@chuck.com",
    password: "Highlander",
  };
  let result = new userModel(dummyUser);
  await result.save();

  dummyUser = {
    username: "lassoted",
    first_name: "Ted",
    last_name: "Lasso",
    email: "ted@apple.tv",
    password: "ilovesoccer",
  };
  result = new userModel(dummyUser);
  await result.save();

  dummyUser = {
    username: "Ihavenoidea",
    first_name: "Pepe",
    last_name: "Guardiola",
    email: "soccer@soccer.com",
    password: "nopainnogain",
  };
  result = new userModel(dummyUser);
  await result.save();
});

afterEach(async () => {
  await userModel.deleteMany();
});

test("Fetching all users", async () => {
  let id;
  const users = await userServices.getUsers(id);
  expect(users).toBeDefined();
  expect(users.length).toBeGreaterThan(0);
});

test("Fetching by invalid id format", async () => {
  const anyId = "123";
  const user = await userServices.getUsers(anyId);
  expect(user).toBeUndefined();
});

test("Fetching by valid id and not finding", async () => {
  const anyId = "6132b9d47cefd0cc1916b6a9";
  const user = await userServices.getUsers(anyId);
  expect(user).toBeNull();
});

test("Fetching by valid id and finding", async () => {
  const dummyUser = {
    username: "theboywholives",
    first_name: "Harry",
    last_name: "Potter",
    email: "hpotter@hogwarts.edu",
    password: "iloveginny",
  };
  const result = new userModel(dummyUser);
  const addedUser = await result.save();
  const foundUser = await userServices.getUsers(addedUser.id);
  expect(foundUser).toBeDefined();
  expect(foundUser.id).toBe(addedUser.id);
  expect(foundUser.name).toBe(addedUser.name);
  expect(foundUser.job).toBe(addedUser.job);
});

test("Deleting a user by Id -- successful path", async () => {
  const dummyUser = {
    username: "theboywholives",
    first_name: "Harry",
    last_name: "Potter",
    email: "hpotter@hogwarts.edu",
    password: "iloveginny",
  };
  const result = new userModel(dummyUser);
  const addedUser = await result.save();
  const deleteResult = await userModel.findOneAndDelete({ _id: addedUser.id });
  expect(deleteResult).toBeTruthy();
});

test("Deleting a user by Id -- inexisting id", async () => {
  const anyId = "6132b9d47cefd0cc1916b6a9";
  const deleteResult = await userModel.findOneAndDelete({ _id: anyId });
  expect(deleteResult).toBeNull();
});

test("Adding user -- successful path", async () => {
  const dummyUser = {
    username: "theboywholives",
    first_name: "Harry",
    last_name: "Potter",
    email: "hpotter@hogwarts.edu",
    password: "iloveginny",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeTruthy();
  expect(result.name).toBe(dummyUser.name);
  expect(result.job).toBe(dummyUser.job);
  expect(result).toHaveProperty("_id");
});

test("Adding user -- failure path with invalid id", async () => {
  const dummyUser = {
    _id: "123",
    username: "theboywholives",
    first_name: "Harry",
    last_name: "Potter",
    email: "hpotter@hogwarts.edu",
    password: "iloveginny",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Adding user -- failure path with already taken id", async () => {
  const dummyUser = {
    username: "theboywholives",
    first_name: "Harry",
    last_name: "Potter",
    email: "hpotter@hogwarts.edu",
    password: "iloveginny",
  };
  const addedUser = await userServices.addUser(dummyUser);

  const anotherDummyUser = {
    _id: addedUser.id,
    username: "redisbest",
    first_name: "Ron",
    last_name: "Weasley",
    email: "rweasley@hogwarts.com",
    password: "chess4life",
  };
  const result = await userServices.addUser(anotherDummyUser);
  expect(result).toBeFalsy();
});

test("Adding user -- failure path with no username", async () => {
  const dummyUser = {
    first_name: "Harry",
    last_name: "Potter",
    email: "hpotter@hogwarts.edu",
    password: "iloveginny",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Adding user -- failure path with no first name", async () => {
  const dummyUser = {
    username: "theboywholives",
    last_name: "Potter",
    email: "hpotter@hogwarts.edu",
    password: "iloveginny",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Adding user -- failure path with no last name", async () => {
  const dummyUser = {
    username: "theboywholives",
    first_name: "Harry",
    email: "hpotter@hogwarts.edu",
    password: "iloveginny",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Adding user -- failure path with no email", async () => {
  const dummyUser = {
    username: "theboywholives",
    first_name: "Harry",
    last_name: "Potter",
    password: "iloveginny",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Adding user -- failure path with no password", async () => {
  const dummyUser = {
    username: "theboywholives",
    first_name: "Harry",
    last_name: "Potter",
    email: "hpotter@hogwarts.edu",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});
