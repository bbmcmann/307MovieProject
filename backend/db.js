const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let dbConnection;

function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    dbConnection.on("connected", function () {
      console.log(`MongoDB :: connected`);
    });

    dbConnection.on("disconnected", function () {
      console.log(`MongoDB :: disconnected`);
    });

    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  }
  return dbConnection;
}

function setConnection(newConn) {
  dbConnection = newConn;
  return dbConnection;
}

module.exports.getDbConnection = getDbConnection;
module.exports.setConnection = setConnection;
