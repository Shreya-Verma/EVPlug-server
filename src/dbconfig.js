/**
 * @author: Shreya Verma
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { DB_PASSWORD } = process.env;

//Prod
const connectDB = () => {
  return mongoose
    .connect(`mongodb://evplug-db:${DB_PASSWORD}@evplug-db.mongo.cosmos.azure.com:10255/evplugDB?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@evplug-db@`)
    .then(() => console.log(`database connected successfully`))
    .catch((err) => console.log("Error connecting to db",err.message));
};


module.exports = connectDB;
