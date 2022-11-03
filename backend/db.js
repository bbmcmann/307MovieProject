const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// need to figure out a way to let us export this function and use it
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

module.exports = getDbConnection;