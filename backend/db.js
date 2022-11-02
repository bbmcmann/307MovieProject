const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let dbConnection;

async function getDbConnection() {
    if (!dbConnection) {
        dbConnection = await mongoose.createConnection(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
}

module.exports = getDbConnection;