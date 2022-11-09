const Users = require("../models/users");

async function getUsers(id) {
  let result;
  if (id) {
    result = await findUserById(id);
  } else if (id === undefined) {
    result = await Users.find();
  }
  return result;
}

async function findUserById(id) {
  try {
    return await Users.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new Users(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateUserById(id, username, first, last) {
  try {
    const updateUser = await Users.updateOne({"_id": id}, {$set: {"username": username, "first_name": first, "last_name": last}});
    return updateUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteUserById(id) {
  try {
    const remUser = await Users.findByIdAndDelete(id);
    return remUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
