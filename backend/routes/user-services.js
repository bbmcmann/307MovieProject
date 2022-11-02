const mongoose = require("mongoose");
const UserSchema = require("../models/users.js");
const dotenv = require("dotenv");
dotenv.config();
// const db = require("../db.js");

let dbConnection;

function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
} 

async function getUsers(username) {
    const  userModel = getDbConnection().model("User", UserSchema);
    let result;
    if (username) {
        result = await userModel.findUserByUserName(username);
    } else if (username === undefined){
        result = await userModel.find();
    }
    return result;
}

async function addUser(user) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save();
        return savedUser;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function deleteUserById(id) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        const remUser = await userModel.findByIdAndDelete(id);
        return remUser;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.getUsers = getUsers;
exports.addUser = addUser;
exports.deleteUserById = deleteUserById;

