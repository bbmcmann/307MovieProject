const mongoose = require("mongoose");
const Users = require("../models/users.js");
const dotenv = require("dotenv");
dotenv.config();

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

async function getUsers(id) {
    const  userModel = getDbConnection().model("User", UserSchema);
    let result;
    if (id) {
        result = await findUserById(id);
    } else if (id === undefined) {
        result = await userModel.find();
    }
    return result;
}

async function findUserById(id) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        return await userModel.findById(id);
    } catch (error) {
        console.log(error);
        return undefined;
    }
    
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

