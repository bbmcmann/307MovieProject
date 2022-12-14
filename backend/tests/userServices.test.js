const mongoose = require("mongoose");
const UserSchema = require("../models/userSchema");
const userServices = require("../routes/userServices");
const { Review } = require("../models/reviewSchema");
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

  userModel = conn.model("User", UserSchema.UserSchema);

  db.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
  await mongoose.disconnect();
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

describe("getUsers", () => {
  test("Fetching all users", async () => {
    let id;
    const dummyUser = {
      username: "theboywholives",
      first_name: "Harry",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const result = await userServices.addUser(dummyUser);
    const users = await userServices.getUsers(id);
    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
    await userServices.deleteUserById(result.id);
  });

  test("Fetching by invalid id format", async () => {
    const anyId = "123";
    const user = await userServices.getUsers(anyId);
    expect(user).toBeNull();
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
      reviews: ["63713be424fbebf4c2789dca"],
    };
    const result = await userServices.addUser(dummyUser);
    const addedUser = await result.save();
    const foundUser = await userServices.getUsers(addedUser.id);
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toBe(addedUser.id);
    expect(foundUser.username).toBe(addedUser.username);
    expect(foundUser.first_name).toBe(addedUser.first_name);
    expect(foundUser.last_name).toBe(addedUser.last_name);
    expect(foundUser.email).toBe(addedUser.email);
    expect(foundUser.password).toBe(addedUser.password);
    await userServices.deleteUserById(addedUser.id);
  });
});

describe("findUserById", () => {
  test("success", async () => {
    const dummyUser = {
      username: "theboywholives",
      first_name: "Harry",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const result = await userServices.addUser(dummyUser);
    const addedUser = await result.save();
    const foundUser = await userServices.findUserById(addedUser.id);
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toBe(addedUser.id);
    expect(foundUser.username).toBe(addedUser.username);
    expect(foundUser.first_name).toBe(addedUser.first_name);
    expect(foundUser.last_name).toBe(addedUser.last_name);
    expect(foundUser.email).toBe(addedUser.email);
    expect(foundUser.password).toBe(addedUser.password);
    await userServices.deleteUserById(addedUser.id);
  });

  test("fail", async () => {
    const foundUser = await userServices.findUserById("notavalidid");

    expect(foundUser).not.toBeDefined();
  });
});
describe("deleteUserById", () => {
  test("successful path", async () => {
    const dummyUser = {
      username: "theboywholives",
      first_name: "Harry",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const result = await userServices.addUser(dummyUser);
    const addedUser = await result.save();
    const deleteResult = await userServices.deleteUserById(addedUser.id);
    expect(deleteResult).toBeTruthy();
  });

  test("inexisting id", async () => {
    const anyId = "6132b9d47cefd0cc1916b6a9";
    const deleteResult = await userModel.findOneAndDelete({ _id: anyId });
    expect(deleteResult).toBeNull();
  });
});

describe("addUser", () => {
  test("successful path", async () => {
    const dummyUser = {
      username: "theboywholives",
      first_name: "Harry",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const result = await userServices.addUser(dummyUser);
    expect(result).toBeTruthy();
    expect(result.username).toBe(dummyUser.username);
    expect(result.first_name).toBe(dummyUser.first_name);
    expect(result.last_name).toBe(dummyUser.last_name);
    expect(result.email).toBe(dummyUser.email);
    expect(result.password).toBe(dummyUser.password);
    expect(result).toHaveProperty("_id");
    await userServices.deleteUserById(result.id);
  });

  test("failure path with invalid id", async () => {
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

  test("failure path with already taken id", async () => {
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
    await userServices.deleteUserById(addedUser.id);
  });

  test("failure path with no username", async () => {
    const dummyUser = {
      first_name: "Harry",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const result = await userServices.addUser(dummyUser);
    expect(result).toBeFalsy();
  });

  test("failure path with no first name", async () => {
    const dummyUser = {
      username: "theboywholives",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const result = await userServices.addUser(dummyUser);
    expect(result).toBeFalsy();
  });

  test("failure path with no last name", async () => {
    const dummyUser = {
      username: "theboywholives",
      first_name: "Harry",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const result = await userServices.addUser(dummyUser);
    expect(result).toBeFalsy();
  });

  test("failure path with no email", async () => {
    const dummyUser = {
      username: "theboywholives",
      first_name: "Harry",
      last_name: "Potter",
      password: "iloveginny",
    };
    const result = await userServices.addUser(dummyUser);
    expect(result).toBeFalsy();
  });

  test("failure path with no password", async () => {
    const dummyUser = {
      username: "theboywholives",
      first_name: "Harry",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
    };
    const result = await userServices.addUser(dummyUser);
    expect(result).toBeFalsy();
  });
});

describe("udpateUserById", () => {
  test("successful path with username, first and last name", async () => {
    const dummyUser = {
      username: "theboywholives",
      first_name: "Harry",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const updatedUser = {
      username: "iputmynameinthegoblet",
      first_name: "Hurry",
      last_name: "potter",
    };
    const addedUser = await userServices.addUser(dummyUser);
    console.log(addedUser);
    const result = await userServices.updateUserById(
      addedUser.id,
      updatedUser.username,
      updatedUser.first_name,
      updatedUser.last_name
    );
    expect(result).toBeTruthy();
    expect(result.username).toBe(updatedUser.username);
    expect(result.first_name).toBe(updatedUser.first_name);
    expect(result.last_name).toBe(updatedUser.last_name);
    expect(result).toHaveProperty("_id");
    await userServices.deleteUserById(addedUser.id);
  });

  test("successful path with username", async () => {
    const dummyUser = {
      username: "theboywholives",
      first_name: "Harry",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const updatedUser = {
      username: "iputmynameinthegoblet",
    };
    const addedUser = await userServices.addUser(dummyUser);
    const result = await userServices.updateUserById(
      addedUser.id,
      updatedUser.username,
      dummyUser.first_name,
      dummyUser.last_name
    );
    expect(result).toBeTruthy();
    expect(result.username).toBe(updatedUser.username);
    expect(result.first_name).toBe(dummyUser.first_name);
    expect(result.last_name).toBe(dummyUser.last_name);
    expect(result).toHaveProperty("_id");
    await userServices.deleteUserById(addedUser.id);
  });

  test("successful path with first", async () => {
    const dummyUser = {
      username: "theboywholives",
      first_name: "Harry",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const updatedUser = {
      first_name: "hurry",
    };
    const addedUser = await userServices.addUser(dummyUser);
    const result = await userServices.updateUserById(
      addedUser.id,
      dummyUser.username,
      updatedUser.first_name,
      dummyUser.last_name
    );
    expect(result).toBeTruthy();
    expect(result.username).toBe(dummyUser.username);
    expect(result.first_name).toBe(updatedUser.first_name);
    expect(result.last_name).toBe(dummyUser.last_name);
    expect(result).toHaveProperty("_id");
    await userServices.deleteUserById(addedUser.id);
  });

  test("successful path with last", async () => {
    const dummyUser = {
      username: "theboywholives",
      first_name: "Harry",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const updatedUser = {
      last_name: "potman",
    };
    const addedUser = await userServices.addUser(dummyUser);
    const result = await userServices.updateUserById(
      addedUser.id,
      dummyUser.username,
      dummyUser.first_name,
      updatedUser.last_name
    );
    expect(result).toBeTruthy();
    expect(result.username).toBe(dummyUser.username);
    expect(result.first_name).toBe(dummyUser.first_name);
    expect(result.last_name).toBe(updatedUser.last_name);
    expect(result).toHaveProperty("_id");
    await userServices.deleteUserById(addedUser.id);
  });

  test("failure with invalid id", async () => {
    const dummyUser = {
      _id: "123",
      username: "theboywholives",
      first_name: "Harry",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const updatedUser = {
      username: "iputmynameinthegoblet",
      first_name: "Hurry",
      last_name: "potter",
    };
    const addedUser = await userServices.addUser(dummyUser);
    const result = await userServices.updateUserById(
      addedUser.id,
      dummyUser.username,
      dummyUser.first_name,
      updatedUser.last_name
    );
    expect(result).toBeFalsy();
  });

  test("failure with no information given", async () => {
    const dummyUser = {
      _id: "123",
      username: "theboywholives",
      first_name: "Harry",
      last_name: "Potter",
      email: "hpotter@hogwarts.edu",
      password: "iloveginny",
    };
    const addedUser = await userServices.addUser(dummyUser);
    const result = await userServices.updateUserById(addedUser.id);
    expect(result).toBeFalsy();
  });
});
