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
  
    conn = await mongoose.createConnection(uri, mongooseOpts);
  
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
      password: "Highlander"
    };
    let result = new userModel(dummyUser);
    await result.save();
  
    dummyUser = {
      username: "lassoted",
      first_name: "Ted",
      last_name: "Lasso",
      email: "ted@apple.tv",
      password: "ilovesoccer"
    };
    result = new userModel(dummyUser);
    await result.save();
  
    dummyUser = {
      username: "Ihavenoidea",
      first_name: "Pepe",
      last_name: "Guardiola",
      email: "soccer@soccer.com",
      password: "nopainnogain"
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