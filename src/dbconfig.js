/**
 * @author: Shreya Verma
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { DB_PASSWORD } = process.env;

const connectDB = () => {
  return mongoose
    .connect(`mongodb://evplug:${DB_PASSWORD}@evplug.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@evplug@`)
    .then(() => console.log(`database connected successfully`))
    .catch((err) => console.log("Error connecting to db",err.message));
};

module.exports = connectDB;
