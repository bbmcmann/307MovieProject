const mongoose = require("mongoose");
const Movie = require("../models/movieSchema.js");
const {
  getMovieById,
  updateMovieById,
  searchMovie,
  createMovie,
  getPopularMovies,
  getSuggestedMovies,
} = require("../routes/movieServices.js");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { setConnection } = require("../db.js");

let mongoServer;
let conn;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
  await mongoose.disconnect();
});

beforeEach(async () => {
  //! Need to add reviews. waiting on review schema

  let dummyMovie = {
    // The Avengers
    _id: 24428,
    score: 8,
    reviews: ["6362bb7d8b68ea4a3f5daf3a", "6362fc867ef39ff9aa96270c"],
  };
  let result = new Movie(dummyMovie);
  await result.save();

  dummyMovie = {
    // Avengers: Infinity War
    _id: 299536,
    score: 6,
    reviews: ["6362bb7d8b68ea4a3f5daf3a", "6362fc867ef39ff9aa96270c"],
  };
  result = new Movie(dummyMovie);
  await result.save();

  dummyMovie = {
    // Avengers: Endgame
    _id: 299534,
    score: 9,
    reviews: ["6362bb7d8b68ea4a3f5daf3a", "6362fc867ef39ff9aa96270c"],
  };
  result = new Movie(dummyMovie);
  await result.save();

  dummyMovie = {
    // Avengers: Age of Ultron
    _id: 99861,
    score: 5,
    reviews: ["6362bb7d8b68ea4a3f5daf3a", "6362fc867ef39ff9aa96270c"],
  };
  result = new Movie(dummyMovie);
  await result.save();
});

afterEach(async () => {
  await Movie.deleteMany();
});

/*--------- Test Cases ---------*/

describe("get Movie by Id Tests", () => {
  test("id exists in db", async () => {
    const result = await getMovieById(24428);
    const expected = {
      title: "The Avengers",
      description:
        "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
      poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
      _id: 24428,
      score: 8,
    };
    expect(result._id).toBe(expected._id);
    expect(result.title).toBe(expected.title);
    expect(result.description).toBe(expected.description);
    expect(result.score).toBe(expected.score);
    expect(result.poster_path).toBe(expected.poster_path);
    expect(result.reviews).toBeTruthy();
  });

  test("id does not exist in db", async () => {
    const result = await getMovieById(488379);
    const expected = {
      title: "Avenge the Crows",
      description:
        "A former gang member and her young cousin become embroiled in a vendetta between L.A. gangs, as rivals seek revenge for old crimes.",
      poster_path: "/jRqBPresKOmbs1sQZgHDSKH3QOn.jpg",
      _id: 488379,
    };
    expect(result._id).toBe(expected._id);
    expect(result.title).toBe(expected.title);
    expect(result.description).toBe(expected.description);
    expect(result.score).toBeFalsy();
    expect(result.poster_path).toBe(expected.poster_path);
    expect(result.reviews).toBeFalsy();
  });

  test("throw error", async () => {
    await expect(getMovieById(0)).rejects.toThrow("Could not find movie");
  });
});

describe("update Movie by Id Tests", () => {
  test("success add one", async () => {
    await updateMovieById(24428, "6363ebf2fddfec1bee01715c", 10);
    const expected = {
      _id: 24428,
      score: 8.67,
    };
    const result = await Movie.findById(24428);
    expect(result._id).toBe(expected._id);
    expect(result.score).toBeCloseTo(expected.score);
    expect(result.reviews.length).toBe(3);
  });

  test("success add two", async () => {
    await updateMovieById(24428, "6363ebf2fddfec1bee01715c", 10);
    await updateMovieById(24428, "6363ebf2fddfec1bee01715c", 10);
    const expected = {
      _id: 24428,
      score: 9.0,
    };
    const result = await Movie.findById(24428);
    expect(result._id).toBe(expected._id);
    expect(result.score).toBeCloseTo(expected.score);
    expect(result.reviews.length).toBe(4);
  });

  test("throw error", async () => {
    await expect(
      updateMovieById(0, "6363ebf2fddfec1bee01715c", 10)
    ).rejects.toThrow("Could not update movie");
  });
});
