const UserSchema = require("../models/userSchema");
const MovieSchema = require("../models/movieSchema");

const Users = UserSchema.Users;

async function getUsers(id) {
  let result;
  if (id) {
    if (id.length < 20) {
      result = await findUserByUsername(id);
    } else {
      result = await findUserById(id);
    }
  } else if (id === undefined) {
    result = await Users.find();
  }
  return result;
}

async function findUserByUsername(id) {
  console.log(" User_name:", id);
  try {
    return await Users.findOne({ username: id });
  } catch (error) {
    return false;
  }
}

async function findUserById(id) {
  console.log(" User Id:", id);
  try {
    const result = await Users.findById(id).populate({
      path: "reviews",
      populate: { path: "movie_id", model: MovieSchema },
    });
    return result;
  } catch (error) {
    //console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new Users(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    //console.log(error);
    return false;
  }
}

async function updateUserById(id, username, first, last, pun) {
  try {
    const result = await Users.updateOne(
      { _id: id },
      {
        $set: {
          username: username,
          first_name: first,
          last_name: last,
          fav_pun: pun,
        },
      }
    );
    if (result.acknowledged) {
      return findUserById(id);
    }
    return false;
  } catch (error) {
    //console.log(error);
    return false;
  }
}

async function deleteUserById(id) {
  try {
    const remUser = await Users.findByIdAndDelete(id);
    return remUser;
  } catch (error) {
    //console.log(error);
    return false;
  }
}

exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
exports.findUserById = findUserById;
