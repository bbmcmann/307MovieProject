const mongoose = require("mongoose");
const Movie = require("../models/movieSchema.js");
const { Review } = require("../models/reviewSchema.js");
const {
  getMovieById,
  updateMovieById,
  searchMovie,
  createMovie,
  getPopularMovies,
  getSuggestedMovies,
  movieInDb,
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
  let dummyReview = {
    review_title: "Amazing movie123",
    text: "Full of action, humor, and family fun",
    score: 8,
    author_id: "6362bb7d8b68ea4a3f5daf3a",
    movie_id: 24428,
    date_posted: new Date(),
    upvotes: 100,
    downvotes: 1,
  };
  let revOne = new Review(dummyReview);
  await revOne.save();

  dummyReview = {
    review_title: "Loved it456",
    text: "Full of action, humor, and family fun",
    score: 8,
    author_id: "6362bb7d8b68ea4a3f5daf3a",
    movie_id: 24428,
    date_posted: new Date(),
    upvotes: 100,
    downvotes: 1,
  };
  let revTwo = new Review(dummyReview);
  await revTwo.save();

  let dummyMovie = {
    // The Avengers
    _id: 24428,
    score: 8,
    reviews: [revOne._id, revTwo._id],
  };
  let result = new Movie(dummyMovie);
  await result.save();

  dummyMovie = {
    // Avengers: Infinity War
    _id: 299536,
    score: 8,
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

afterAll(async () => {
  const objects = [24428, 299536, 299534, 99861, 1003596];
  await Movie.deleteMany({ _id: { $in: objects } });
  await Review.deleteMany({ movie_id: 24428 });
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
  await mongoose.disconnect();
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
    expect(result.poster_path).toBe(expected.poster_path);
    expect(result.score).toBe(expected.score);
    expect(result.reviews).not.toBeNull();
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
    await updateMovieById(299536, "6363ebf2fddfec1bee01715c", 10);
    await updateMovieById(299536, "6363ebf2fddfec1bee01715c", 10);
    const expected = {
      _id: 299536,
      score: 9.0,
    };
    const result = await Movie.findById(299536);
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

describe("search Movies Tests", () => {
  test("success", async () => {
    const result = await searchMovie("avenge");

    expect(result[0]).toBeTruthy();
  });

  test("no results", async () => {
    const result = await searchMovie("akasjfkashknmvakjsn");

    expect(result.length).toBe(0);
  });
});

describe("create Movies Tests", () => {
  test("success", async () => {
    const result = await createMovie(1003596, "6363ebf2fddfec1bee01715c", 10);
    const expected = {
      _id: 1003596,
      score: 10,
      reviews: ["6363ebf2fddfec1bee01715c"],
    };
    expect(result._id).toBe(expected._id);
    expect(result.score).toBe(expected.score);
    expect(JSON.stringify(result.reviews[0])).toEqual(
      JSON.stringify(expected.reviews[0])
    );
  });

  test("throw error", async () => {
    await expect(
      createMovie(1003596, "6363ebf2fddfec1bee01715c")
    ).rejects.toThrow("Something went wrong with creating a Movie");
  });
});

describe("Movie in DB Tests", () => {
  test("in db", async () => {
    const result = await movieInDb(99861);

    expect(result._id).toBe(99861);
    expect(result.score).toBe(5);
  });

  test("not in db", async () => {
    const result = await movieInDb(0);

    expect(result).toBeNull();
  });
});

describe("Popular Movie Tests", () => {
  test("success", async () => {
    const result = await getPopularMovies();

    expect(result).toBeTruthy();
  });

  test("success check len", async () => {
    const result = await getPopularMovies();

    expect(result.length).toBe(10);
  });
});

describe("Suggested Movie Tests", () => {
  test("without userId", async () => {
    const result = await getSuggestedMovies();

    expect(result).toBeTruthy();
  });

  // test("with userId with positives reviews", async () => {
  //   const result = await getSuggestedMovies("");

  //   expect(result).toBeTruthy();
  // });

  // test("with userId with no positive reviews", async () => {
  //   const result = await getSuggestedMovies("");

  //   expect(result).toBeTruthy();
  // });
});
